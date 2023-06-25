import { Controller, Get, Query, Param } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plants } from './plants.entity';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get('/')
  getPlantsList(@Query() query): Promise<Plants[]> {
    return this.plantsService.getPlantsList(query);
  }

  @Get('/:id')
  getPlantsById(@Param('id') id: number): Promise<Plants> {
    return this.plantsService.getPlantsById(id);
  }
}
