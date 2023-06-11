import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const password = await bcrypt.hash(
      data.password,
      parseInt(process.env.BCRYPT_SALT),
    );
    return await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: password,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
        role_id: data.role_id ?? 1,
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
    const password = await bcrypt.hash(
      data.password,
      parseInt(process.env.BCRYPT_SALT),
    );
    return await this.prisma.users.update({
      data: {
        name: data.name,
        email: data.email,
        password: password,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
        updated_at: new Date(),
        role_id: data.role_id ?? 1,
      },
      where: {
        id: id,
      },
    });
  }

  async updatePartial(
    { name, email, password, birth_at, role_id }: UpdatePatchUserDTO,
    id: number,
  ) {
    await this.exists(id);
    const data: any = {};

    data.updated_at = new Date();
    if (name) data.name = name;
    if (email) data.email = email;
    if (birth_at) data.birth_at = birth_at;
    if (role_id) data.role_id = role_id;
    if (password) {
      data.password = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT),
      );
    }

    return await this.prisma.users.update({
      data: data,
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
