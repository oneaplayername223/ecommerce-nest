import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ClientGuard } from '../guards/client.guard';

@Controller('payments')
@UseGuards(ClientGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  
  @Post(':id')
 async buyProduct(@Body('quantity', ParseIntPipe) quantityToBuy: number, @Req() req: any, @Param('id', ParseIntPipe) id: number){
    const userId = req.user.id
    const newBuy = await this.paymentsService.buyProduct(id, userId, quantityToBuy);
    
    return `checkout ${newBuy.id} created successfully`
  }

  @Get()
  findPayments(@Req() req: any) {
    const userId = req.user.id
    const payments = this.paymentsService.findPayments(userId);
    return payments
  }

}
