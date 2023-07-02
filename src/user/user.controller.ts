import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  UserCredentialsDto,
  userLoginCredentialsDto,
} from './dto/user-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) usercredentialsDto: UserCredentialsDto,
  ): Promise<any> {
    try {
      const result = await this.userService.signUp(usercredentialsDto);

      return {
        statusCode: 200,
        message: '회원가입에 성공했습니다.',
        data: result,
      };
    } catch (error) {
      return {
        ...error.response,
      };
    }
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) userLoginCredentialsDto: userLoginCredentialsDto,
  ): Promise<any> {
    try {
      const result = await this.userService.signIn(userLoginCredentialsDto);

      return {
        statusCode: 200,
        message: '로그인에 성공했습니다.',
        data: result,
      };
    } catch (error) {
      return {
        ...error.response,
      };
    }
  }

  @Post('/auth')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
