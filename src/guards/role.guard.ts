import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    // throw new Error('Method not implemented.');
    // utilizaremos reflactor para enxergarmos os decorators
    // pega todas sobresscrita do handle e da classe inteira
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const rolesFiltered = requiredRoles.filter((role) => role === user.role_id);
    console.log('requiredRoles', requiredRoles);
    console.log('user', user);
    console.log('rolesFiltered', rolesFiltered);

    if (rolesFiltered.length > 0) return true ?? false;
  }
}
