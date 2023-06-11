import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
// cria um objeto de roles

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
