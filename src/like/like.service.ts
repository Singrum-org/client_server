import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { User } from '../user/user.entity';
import { Plants } from '../plants/plants.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  async likePost(user: User, plants: Plants): Promise<Like> {
    const like = new Like();
    like.user = user;
    like.plants = plants;
    return this.likeRepository.save(like);
  }

  async unlikePost(user: User, plants: Plants): Promise<void> {
    await this.likeRepository.delete({
      user: { id: user.id },
      plants: { id: plants.id },
    });
  }
}
