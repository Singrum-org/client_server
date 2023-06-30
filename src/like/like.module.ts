import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { UserService } from '../user/user.service';
import { PlantsService } from '../plants/plants.service';
import { User } from '../user/user.entity';
import { Plants } from '../plants/plants.entity';
import { TypeOrmExModule } from 'src/configs/typeorm-ex.module';
import { PlantsRepository } from 'src/plants/plants.repository';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User, Plants]),
    TypeOrmExModule.forCustomRepository([PlantsRepository]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: { expiresIn: 60 * 60 },
    }),
  ],
  controllers: [LikeController],
  providers: [PlantsService, LikeService, UserService],
})
export class LikeModule {}
