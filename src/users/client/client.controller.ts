import { Controller, Get, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientGuard } from '../../guards/client.guard';
@Controller('client')
@UseGuards(ClientGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }))
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

@Get()
userInfo(@Req() req: any) {
  const userId: number = req.user.id
  const userInfo = this.clientService.userInfo(userId);
  return userInfo
}
}
