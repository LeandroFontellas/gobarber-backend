/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';
import storageConfig from '@config/storage';

import { Exclude, Expose } from 'class-transformer';

// Aqui a gente n vai fazer o OneToMany ainda pq por enquanto a gente nao
// vai fazer uma busca que vai querer buscar todos os agendamentos de um usuário
// porém vamos fazer dps
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @Column('varchar')
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  get getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (storageConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'S3':
        return `https://${storageConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
