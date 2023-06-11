import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken() {}

  async checkToken(token: string) {}

  async login(email: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email/Senha inválido.');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email inválido.');
    }

    // TODO ENVIAR EMAIL
    return true;
  }

  async reset(password: string, token: string) {
    //TODO VALIDAR TOKEN
    const id = 0;
    return await this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
