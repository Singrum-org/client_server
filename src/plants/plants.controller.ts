import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plants } from './plants.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('plants')
@ApiTags('식물 정보 API')
@ApiResponse({ status: 200, description: '성공' })
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get('/')
  @ApiOperation({
    summary: '식물 정보 리스트 API',
    description: '식물 리스트를 가져온다',
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    enum: ['name', 'view_count', 'createdAt'],
    required: false,
  })
  @ApiResponse({
    description: '식물 리스트를 가져온다.',
    status: 200,
    type: Plants,
  })
  async getPlantsList(@Query() query): Promise<any> {
    const result = await this.plantsService.getPlantsList(query);
    if (result.length === 0) {
      throw new NotFoundException(`식물 리스트가 존재하지 않습니다.`);
    }
    return {
      statusCode: 200,
      message: '식물 리스트를 성공적으로 가져왔습니다.',
      data: [...result],
    };
  }

  @Get('/search')
  @ApiOperation({
    summary: '식물 정보 검색 리스트 API',
    description: '검색에 맞는 식물 리스트를 가져온다',
  })
  @ApiQuery({
    name: 'name',
    required: true,
  })
  @ApiResponse({
    description: '검색에 맞는 식물 리스트를 가져온다.',
    status: 200,
    type: Plants,
  })
  async getPlantsListBySearch(@Query() query): Promise<any> {
    if (!query.name) {
      throw new NotFoundException(`검색 결과가 존재하지 않습니다.`);
    }
    const result = await this.plantsService.getPlantsListBySearch(query);
    if (result.length === 0) {
      throw new NotFoundException(`검색 결과가 존재하지 않습니다.`);
    }
    return {
      statusCode: 200,
      message: '검색 결과를 성공적으로 가져왔습니다.',
      data: [...result],
    };
  }

  @Get('/:id')
  @ApiOperation({
    summary: '식물 상세 정보 API',
    description: '식물 상세 정보를 가져온다.',
  })
  async getPlantsById(@Param('id') id: number): Promise<any> {
    const result = await this.plantsService.getPlantsById(id);
    return {
      statusCode: 200,
      message: '식물 리스트를 성공적으로 가져왔습니다.',
      data: { ...result },
    };
  }

  // db 저장 컨트롤러
  @Post('/api/storage')
  @ApiOperation({
    summary: '식물 정보 저장 API',
    description: '로컬호스트 개인 DB에 저장한다.',
  })
  async getApi(): Promise<any> {
    const response = await this.plantsService.getPlantsData();

    return response;
  }

  // @Post('/')
  // createPlants(): Promise<any> {
  //   return this.plantsService.createPlants();
  // }
}
