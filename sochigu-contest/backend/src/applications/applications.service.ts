import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { ApplicationLog } from './entities/application-log.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApplicationStatus } from '../common/enums/application-status.enum';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private repo: Repository<Application>,
    @InjectRepository(ApplicationLog) private logRepo: Repository<ApplicationLog>,
    private mailService: MailService,
  ) {}

  async create(userId: string, dto: CreateApplicationDto) {
    const app = this.repo.create({ ...dto, userId });
    return this.repo.save(app);
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      relations: ['nomination', 'files'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId?: string) {
    const app = await this.repo.findOne({
      where: { id },
      relations: ['nomination', 'files', 'logs', 'user'],
    });
    if (!app) throw new NotFoundException();
    if (userId && app.userId !== userId) throw new ForbiddenException();
    return app;
  }

  findAll(filters: {
    nominationId?: string;
    status?: ApplicationStatus;
    university?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 20, ...rest } = filters;
    const qb = this.repo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.nomination', 'n')
      .leftJoinAndSelect('a.user', 'u')
      .leftJoinAndSelect('a.files', 'f');

    if (rest.nominationId) qb.andWhere('a.nominationId = :nid', { nid: rest.nominationId });
    if (rest.status) qb.andWhere('a.status = :status', { status: rest.status });
    if (rest.university) qb.andWhere('u.university ILIKE :uni', { uni: `%${rest.university}%` });
    if (rest.search) qb.andWhere('a.projectTitle ILIKE :s', { s: `%${rest.search}%` });

    return qb
      .orderBy('a.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  }

  async update(id: string, userId: string, data: Partial<Application>) {
    const app = await this.findById(id, userId);
    if (app.status !== ApplicationStatus.DRAFT)
      throw new ForbiddenException('Редактирование недоступно после подачи заявки');
    return this.repo.save({ ...app, ...data });
  }

  async submit(id: string, userId: string) {
    const app = await this.findById(id, userId);
    app.status = ApplicationStatus.SUBMITTED;
    app.submittedAt = new Date();
    await this.repo.save(app);
    await this.logStatusChange(app.id, userId, ApplicationStatus.DRAFT, ApplicationStatus.SUBMITTED);
    return app;
  }

  async updateStatus(id: string, adminId: string, dto: UpdateStatusDto) {
    const app = await this.findById(id);
    const prev = app.status;
    app.status = dto.status;
    app.adminComment = dto.comment || app.adminComment;
    await this.repo.save(app);
    await this.logStatusChange(app.id, adminId, prev, dto.status, dto.comment);
    this.mailService.sendStatusUpdate(app).catch(() => {});
    return app;
  }

  async withdraw(id: string, userId: string) {
    const app = await this.findById(id, userId);
    await this.repo.remove(app);
  }

  private async logStatusChange(
    applicationId: string,
    changedById: string,
    fromStatus: ApplicationStatus,
    toStatus: ApplicationStatus,
    comment?: string,
  ) {
    const log = this.logRepo.create({ applicationId, changedById, fromStatus, toStatus, comment });
    return this.logRepo.save(log);
  }
}
