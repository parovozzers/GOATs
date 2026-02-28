import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../applications/entities/application.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Application) private appRepo: Repository<Application>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getSummary() {
    const [totalApplications, totalUsers] = await Promise.all([
      this.appRepo.count(),
      this.userRepo.count(),
    ]);

    const universities = await this.userRepo
      .createQueryBuilder('u')
      .select('COUNT(DISTINCT u.university)', 'count')
      .getRawOne();

    return {
      totalApplications,
      totalUsers,
      totalUniversities: +universities.count,
    };
  }

  getByNomination() {
    return this.appRepo
      .createQueryBuilder('a')
      .leftJoin('a.nomination', 'n')
      .select('n.name', 'nomination')
      .addSelect('COUNT(a.id)', 'count')
      .groupBy('n.name')
      .getRawMany();
  }

  getTimeline() {
    return this.appRepo
      .createQueryBuilder('a')
      .select("DATE_TRUNC('day', a.submittedAt)", 'date')
      .addSelect('COUNT(a.id)', 'count')
      .where('a.submittedAt IS NOT NULL')
      .groupBy("DATE_TRUNC('day', a.submittedAt)")
      .orderBy('date', 'ASC')
      .getRawMany();
  }

  getTopUniversities() {
    return this.appRepo
      .createQueryBuilder('a')
      .leftJoin('a.user', 'u')
      .select('u.university', 'university')
      .addSelect('COUNT(a.id)', 'count')
      .where('u.university IS NOT NULL')
      .groupBy('u.university')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();
  }

  getGeography() {
    return this.userRepo
      .createQueryBuilder('u')
      .select('u.city', 'city')
      .addSelect('COUNT(u.id)', 'count')
      .where('u.city IS NOT NULL')
      .groupBy('u.city')
      .orderBy('count', 'DESC')
      .getRawMany();
  }

  getKeywords() {
    return this.appRepo
      .createQueryBuilder('a')
      .select('UNNEST(a.keywords)', 'keyword')
      .addSelect('COUNT(*)', 'count')
      .where('a.keywords IS NOT NULL')
      .groupBy('keyword')
      .orderBy('count', 'DESC')
      .limit(50)
      .getRawMany();
  }
}
