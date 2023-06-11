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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseInterceptors(LogInterceptor)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(body, id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async updatePartial(@Body() body, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updatePartial(body, id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    //utilizando pipe local para forçar o id ser inteiro
    return this.userService.remove(id);
  }
}
