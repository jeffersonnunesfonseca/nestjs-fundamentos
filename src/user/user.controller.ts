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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(body, id);
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updatePartial(body, id);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    //utilizando pipe local para forçar o id ser inteiro
    return this.userService.remove(id);
  }
}
