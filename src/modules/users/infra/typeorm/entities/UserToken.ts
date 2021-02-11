/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  // OneToMany,
} from 'typeorm';

// Aqui a gente n vai fazer o OneToMany ainda pq por enquanto a gente nao
// vai fazer uma busca que vai querer buscar todos os agendamentos de um usuário
// porém vamos fazer dps
@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
