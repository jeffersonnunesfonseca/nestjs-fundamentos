import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
      },
      select: {
        id: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async update(data: UpdatePutUserDTO, id: number) {
    await this.exists(id);

    return await this.prisma.users.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
        updated_at: new Date(),
      },
      where: {
        id: id,
      },
    });
  }

  async updatePartial(data: UpdatePatchUserDTO, id: number) {
    await this.exists(id);

    return await this.prisma.users.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
        updated_at: new Date(),
      },
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);

    return await this.prisma.users.delete({
      where: {
        id: id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.users.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
