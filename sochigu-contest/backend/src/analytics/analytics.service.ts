import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Application) private appRepo: Repository<Application>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getSummary() {
    const [totalApplications, totalUsers] = await Promise.all([
      this.appRepo.count(),
      this.userRepo.count({ where: { role: Role.PARTICIPANT } }),
    ]);

    const universities = await this.userRepo
      .createQueryBuilder('u')
      .select('COUNT(DISTINCT u.university)', 'count')
      .where("u.university IS NOT NULL AND u.university != '' AND u.role = :role", { role: Role.PARTICIPANT })
      .getRawOne();

    return {
      totalApplications,
      totalUsers,
      totalUniversities: +universities.count,
    };
  }

  async getByNomination() {
    const rows = await this.appRepo
      .createQueryBuilder('a')
      .leftJoin('a.nomination', 'n')
      .select('n.name', 'nomination')
      .addSelect('COUNT(a.id)', 'count')
      .where('a.nominationId IS NOT NULL')
      .groupBy('n.name')
      .getRawMany();
    return rows.map(r => ({ ...r, count: Number(r.count) }));
  }

  async getTimeline() {
    const rows = await this.appRepo
      .createQueryBuilder('a')
      .select("DATE_TRUNC('day', a.submittedAt)", 'date')
      .addSelect('COUNT(a.id)', 'count')
      .where('a.submittedAt IS NOT NULL')
      .groupBy("DATE_TRUNC('day', a.submittedAt)")
      .orderBy('date', 'ASC')
      .getRawMany();
    return rows.map(r => ({ ...r, count: Number(r.count) }));
  }

  async getTopUniversities() {
    const rows = await this.appRepo
      .createQueryBuilder('a')
      .leftJoin('a.user', 'u')
      .select('u.university', 'university')
      .addSelect('COUNT(a.id)', 'count')
      .where('u.university IS NOT NULL')
      .groupBy('u.university')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();
    return rows.map(r => ({ ...r, count: Number(r.count) }));
  }

  async getGeography() {
    const rows = await this.userRepo
      .createQueryBuilder('u')
      .select('u.city', 'city')
      .addSelect('COUNT(u.id)', 'count')
      .where('u.city IS NOT NULL AND u.role = :role', { role: Role.PARTICIPANT })
      .groupBy('u.city')
      .orderBy('count', 'DESC')
      .getRawMany();
    return rows.map(r => ({ ...r, count: Number(r.count) }));
  }

  async getKeywords() {
    const rows = await this.appRepo.manager.query(`
      SELECT TRIM(keyword) AS keyword, COUNT(*) AS count
      FROM applications a,
      UNNEST(STRING_TO_ARRAY(a.keywords, ',')) AS keyword
      WHERE a.keywords IS NOT NULL AND a.keywords != '' AND TRIM(keyword) != ''
      GROUP BY TRIM(keyword)
      ORDER BY count DESC
      LIMIT 50
    `);
    return rows.map((r: any) => ({ ...r, count: Number(r.count) }));
  }
}
