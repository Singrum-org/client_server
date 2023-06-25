import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { TypeOrmExModule } from 'src/configs/typeorm-ex.module';
import { PlantsRepository } from './plants.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PlantsRepository])],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
