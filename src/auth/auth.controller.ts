import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthMeDTO } from './dto/auth-me.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('/login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return await this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return await this.authService.reset(password, token);
  }

  // @Post('me')
  // async me(@Headers('authorization') token: string) {
  //   return await this.authService.checkToken((token ?? '').split(' ')[1]);
  // }
  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('email') user: users) {
    // return await this.authService.checkToken((token ?? '').split(' ')[1]);
    return {
      user,
    };
  }
}
