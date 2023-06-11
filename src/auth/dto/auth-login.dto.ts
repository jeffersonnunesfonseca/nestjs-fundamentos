import { IsEmail, IsStrongPassword, isEmail } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
