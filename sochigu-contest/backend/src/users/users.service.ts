import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll(filters?: { role?: string; search?: string }) {
    const qb = this.repo.createQueryBuilder('u');
    if (filters?.role) qb.andWhere('u.role = :role', { role: filters.role });
    if (filters?.search)
      qb.andWhere('u.email ILIKE :s OR u.lastName ILIKE :s', {
        s: `%${filters.search}%`,
      });
    return qb.orderBy('u.createdAt', 'DESC').getMany();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findByEmailWithPassword(email: string) {
    return this.repo
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.email = :email', { email })
      .getOne();
  }

  create(data: Partial<User>) {
    return this.repo.save(this.repo.create(data));
  }

  update(id: string, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  updateRefreshToken(id: string, token: string | null) {
    return this.repo.update(id, { refreshToken: token });
  }

  sanitize(user: User) {
    const { password, refreshToken, ...rest } = user as any;
    return rest;
  }
}
