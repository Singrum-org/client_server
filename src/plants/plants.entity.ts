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

  @Column()
  name: string;

  // 품종 (과명)
  @Column()
  variety: string;

  // 원산지
  @Column()
  origin: string;

  // 조언 정보
  @Column()
  advice: string;

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

  // 독성 정보
  @Column()
  toxicity: string;

  // 번식 시기
  @Column()
  breeding_season: string;

  // 관리 수준
  @Column()
  management_level: string;

  // 생장 속도
  @Column()
  growth_rate: string;

  // 생육 온도
  @Column()
  growth_temperature: string;

  // 겨울 최저 온도
  @Column()
  lowest_temperature: string;

  // 습도 코드
  @Column()
  humidity: string;

  // 비료 정보
  @Column()
  fertilizer: string;

  // 토양 정보
  @Column()
  soil: string;

  // 물주기
  @Column('simple-array', { nullable: true })
  watering: string[];

  // 병충해 관리
  @Column()
  pest_control: string;

  // 특별 관리 정보
  @Column()
  special_manage_info: string;

  // 기능성 정보
  @Column()
  functionality_info: string;

  // 조회수
  @Column()
  view_count: number;

  @CreateDateColumn()
  createAt: Date;
}
