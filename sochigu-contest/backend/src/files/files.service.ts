import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppFile } from './entities/file.entity';
import { FileCategory } from '../common/enums/file-type.enum';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(AppFile) private repo: Repository<AppFile>) {}

  async saveFile(
    applicationId: string,
    file: Express.Multer.File,
    category: FileCategory,
  ) {
    const entity = this.repo.create({
      applicationId,
      originalName: file.originalname,
      storageName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      category,
      path: file.path,
    });
    return this.repo.save(entity);
  }

  findByApplication(applicationId: string) {
    return this.repo.find({ where: { applicationId } });
  }

  async findById(id: string) {
    const file = await this.repo.findOne({ where: { id } });
    if (!file) throw new NotFoundException();
    return file;
  }

  async remove(id: string) {
    const file = await this.findById(id);
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    return this.repo.remove(file);
  }
}
