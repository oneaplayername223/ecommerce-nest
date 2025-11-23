import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { loginUserDto } from './dto/login-user.dto';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {
private prisma = new PrismaClient();
async register(createUserDto: CreateUserDto){
    const username = createUserDto.username
    const password = bcrypt.hashSync(createUserDto.password, 10);
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (user) throw new BadRequestException('User already exists');

    const newUser = this.prisma.user.create({data: {username, password}});
    return newUser;

}

async login(loginUserDto: loginUserDto): Promise<string | null> {
  const { username, password } = loginUserDto;

  const user = await this.prisma.user.findFirst({ where: { username } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '1h',
  });

  return token;
}

}