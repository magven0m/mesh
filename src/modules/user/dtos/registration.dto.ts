import { IsEmail, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class RegistrationDTO {
  @IsEmail()
  @MaxLength(64)
  email: string;

  @MaxLength(64)
  @MinLength(4)
  nickname: string;

  @MaxLength(64)
  @IsStrongPassword()
  password: string;
}
