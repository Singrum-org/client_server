import { Repository } from 'typeorm';
import { CustomRepository } from '../configs/typeorm-ex.decorator';
import { Plants } from './plants.entity';

@CustomRepository(Plants)
export class PlantsRepository extends Repository<Plants> {}
