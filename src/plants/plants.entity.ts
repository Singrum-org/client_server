import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Plants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  plantsNo: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  thumbImageUrl: string;

  // 품종 (과명)
  @Column()
  variety: string;

  // 원산지
  @Column()
  origin: string;

  // 성장 높이
  @Column()
  height: number;

  // 성장 넓이
  @Column()
  area: number;

  // 잎 형태
  @Column()
  leaf: string;

  // 냄새 정보
  @Column()
  smell: string;

  // 번식 시기
  @Column()
  breeding_season: string;

  // 생장 속도
  @Column()
  growth_rate: string;

  // 생육 온도
  @Column()
  growth_temperature: string;

  // 습도 코드
  @Column()
  humidity: string;

  // 기능성 정보
  @Column()
  functionality_info: string;

  // 조회수
  @Column()
  view_count: number;

  @CreateDateColumn()
  createdAt: Date;
}
