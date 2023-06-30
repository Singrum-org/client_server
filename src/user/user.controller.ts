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
  signUp(
    @Body(ValidationPipe) usercredentialsDto: UserCredentialsDto,
  ): Promise<User> {
    return this.userService.signUp(usercredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) userLoginCredentialsDto: userLoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userLoginCredentialsDto);
  }

  @Post('/userTest')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
