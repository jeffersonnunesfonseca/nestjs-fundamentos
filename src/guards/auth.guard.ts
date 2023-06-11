import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    // throw new Error('Method not implemented.');
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    console.log('AuthGuard', authorization);

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.jwtPayload = data;
      request.user = await this.userService.findOne(data.id);

      return true;
    } catch (e) {
      console.log('Verifique se esta sendo passo um token');
      return false;
    }
  }
}
