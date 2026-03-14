import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  faculty: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  course: number;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'enum', enum: Role, default: Role.PARTICIPANT })
  role: Role;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
