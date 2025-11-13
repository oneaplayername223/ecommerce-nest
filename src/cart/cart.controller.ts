import { Controller, Get, Post, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ClientGuard } from '../guards/client.guard';


@Controller('cart')
@UseGuards(ClientGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/:id')
 async addToCart(@Req() req: any, @Param('id', ParseIntPipe) id: number){
    const userId: number = req.user.id
    await this.cartService.addToCart(id, userId);
    return 'Product added to cart successfully'
  }

  @Get('/')
  async findCart(@Req() req: any) {
    const userId = req.user.id
    const cart = await this.cartService.findCart(userId);
    return cart
  }

  @Get('/:id')
  async findCartProduct(@Param('id', ParseIntPipe) id: number){
    const cart = await this.cartService.findCartProduct(id);
    return cart

  }
}
