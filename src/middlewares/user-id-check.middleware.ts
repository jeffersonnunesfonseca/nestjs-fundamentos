import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('Antes UserIdCheckMiddleware');
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID Inválido');
    }
    console.log('Depois UserIdCheckMiddleware');
    next();
  }
}
