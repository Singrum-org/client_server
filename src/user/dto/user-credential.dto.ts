import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  email: string;

  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  username: string;

  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  nickname: string;

  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  // 영어랑 숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영어, 숫자로 이루어진 비밀번호를 입력해주세요.',
  })
  password: string;
}

export class userLoginCredentialsDto {
  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  email: string;

  @IsString()
  @MinLength(4, { message: '4자 이상 20자 이하로 적어주세요' })
  @MaxLength(20, { message: '4자 이상 20자 이하로 적어주세요' })
  // 영어랑 숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영어, 숫자로 이루어진 비밀번호를 입력해주세요.',
  })
  password: string;
}
