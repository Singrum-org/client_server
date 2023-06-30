// like.controller.ts

import {
  Controller,
  Post,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { LikeService } from './like.service';

import { PlantsService } from '../plants/plants.service';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('likes')
export class LikeController {
  constructor(
    private likeService: LikeService,
    private plantsService: PlantsService,
  ) {}

  @Post(':plantsId')
  async likePost(@Param('plantsId') plantsId: number, @GetUser() user: User) {
    const post = await this.plantsService.getPlantsById(plantsId);
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return this.likeService.likePost(user, post);
  }

  @Delete(':plantsId')
  async unlikePost(@Param('plantsId') plantsId: number, @GetUser() user: User) {
    const post = await this.plantsService.getPlantsById(plantsId);
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return this.likeService.unlikePost(user, post);
  }
}
