import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winner } from './entities/winner.entity';

@Injectable()
export class WinnersService {
  constructor(@InjectRepository(Winner) private repo: Repository<Winner>) {}

  findAll(filters?: { year?: number; nominationId?: string }) {
    const qb = this.repo.createQueryBuilder('w').leftJoinAndSelect('w.nomination', 'n');
    if (filters?.year) qb.andWhere('w.year = :year', { year: filters.year });
    if (filters?.nominationId) qb.andWhere('w.nominationId = :nid', { nid: filters.nominationId });
    return qb.orderBy('w.year', 'DESC').addOrderBy('w.place', 'ASC').getMany();
  }

  getYears() {
    return this.repo
      .createQueryBuilder('w')
      .select('DISTINCT w.year', 'year')
      .orderBy('w.year', 'DESC')
      .getRawMany();
  }

  create(data: Partial<Winner>) {
    return this.repo.save(this.repo.create(data));
  }

  update(id: string, data: Partial<Winner>) {
    return this.repo.update(id, data);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
