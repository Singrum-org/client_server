import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Like } from '../like/like.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  // 유저와 좋아요(Like) 엔티티 사이의 관계 설정
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  // 만들어진 날짜
  @CreateDateColumn()
  createdAt: Date;
}
