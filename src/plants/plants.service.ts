import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantsRepository } from './plants.repository';
import { Plants } from './plants.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(PlantsRepository)
    private plantsRepository: PlantsRepository,
  ) {}

  async getPlantsList(query): Promise<Plants[]> {
    try {
      let queryBuilder = this.plantsRepository.createQueryBuilder('plants');

      switch (query.sort) {
        case 'name':
          queryBuilder = queryBuilder.orderBy('plants.name', 'ASC');
          break;
        case 'popularity':
          queryBuilder = queryBuilder.orderBy('plants.popularity', 'DESC');
          break;
        case 'createdAt':
          queryBuilder = queryBuilder.orderBy('plants.createdAt', 'DESC');
          break;
        default:
          queryBuilder = queryBuilder.orderBy('post.createdAt', 'DESC');
          break;
      }
      return await queryBuilder.getMany();
    } catch (error) {
      throw new NotFoundException(`Can't find`);
    }
  }

  async getPlantsById(id: number): Promise<Plants> {
    const result = await this.plantsRepository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return result;
  }
}
