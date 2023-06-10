import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // oque irei importar
  controllers: [UserController], //meus controllers
  providers: [UserService], // os serviços injectable
  exports: [], //oque irei exportar do meu modulo
})
export class UserModule {}
