import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @Param('id', ParseIntPipe) id) {
    return {
      method: 'put',
      body,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param('id', ParseIntPipe) id) {
    return {
      method: 'patch',
      body,
      id,
    };
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id) {
    //utilizando pipe local para forçar o id ser inteiro
    return {
      id,
    };
  }
}
