import { Controller, Get, Query, Param, Post } from '@nestjs/common';
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

  @Post()
  // @UseGuards(AuthGuard()) 각각 컨트롤러 메서드에 적용하면 크 메서드에만
  createPlants(): Promise<any> {
    return this.plantsService.createPlants();
  }
}
