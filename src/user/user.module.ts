import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [], // oque irei importar
  controllers: [UserController], //meus controllers
  providers: [], // os serviços injectable
  exports: [], //oque irei exportar do meu modulo
})
export class UserModule {}
