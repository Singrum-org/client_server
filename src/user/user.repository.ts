import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCredentialsDto } from './dto/user-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialsDto: UserCredentialsDto): Promise<User> {
    const { email, username, nickname, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      username,
      nickname,
      password: hashedPassword,
    });

    try {
      await user.save();
      const result = await this.save(user);
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
