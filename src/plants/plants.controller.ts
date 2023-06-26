import { Controller, Get, Query, Param, Post } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plants } from './plants.entity';
import { getApi } from 'src/api/plants';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get('/')
  getPlantsList(@Query() query): Promise<Plants[]> {
    return this.plantsService.getPlantsList(query);
  }

  @Get('/api/temp')
  getApi(): void {
    // getApi();
  }

  @Get('/:id')
  getPlantsById(@Param('id') id: number): Promise<Plants> {
    return this.plantsService.getPlantsById(id);
  }

  @Post('/')
  createPlants(): Promise<any> {
    return this.plantsService.createPlants();
  }
}
