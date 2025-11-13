import { Body, Controller, HttpCode, NotFoundException, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';
import { max } from 'class-validator';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    const data = this.authService.register(createUserDto);
    return data;
  }
  @Post('/login')
  @HttpCode(200)
  async login(@Res({ passthrough: true }) res: Response, @Body() loginUserDto: loginUserDto) 
  {
  
  const token = await this.authService.login(loginUserDto);

  if (!token) throw new NotFoundException('Wrong credentials');

  res.cookie('ecommerceToken', token, { httpOnly: true});
  return { message: 'Login successful' };
}

@Post('/logout')
@HttpCode(200)
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('ecommerceToken');
  return { message: 'Logout successful' };
}
}
