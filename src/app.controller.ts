
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './auth/dto/create-user.dto';
/* istambul ignore file */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  regiter(@Body() createUserDto: CreateUserDto) {
    return console.log(createUserDto);
  }
}
