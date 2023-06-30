import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  UserCredentialsDto,
  userLoginCredentialsDto,
} from './dto/user-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<User> {
    return this.userRepository.createUser(userCredentialsDto);
  }

  async signIn(
    userCredentialsDto: userLoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = userCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
