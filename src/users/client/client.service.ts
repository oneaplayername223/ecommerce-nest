import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateClientDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ClientService {
  private prisma = new PrismaClient();

userInfo(userId: number){
  return this.prisma.user.findUnique({ where: { id: userId }, select: { username: true }});
}

  
}
