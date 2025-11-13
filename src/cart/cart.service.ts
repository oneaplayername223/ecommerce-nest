import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { retry } from 'rxjs';

@Injectable()
export class CartService {
  private prisma = new PrismaClient()
  async addToCart(id: number, userId: number) {
    const newDate: string = new Date().toISOString();

    const product = await this.prisma.product.findUnique({ where: { id }, select: { quantity: true, userId: true} });
    
    if (!product || product?.quantity <= 0) 
      {throw new BadRequestException('Product not found or out of stock');}

    if (product?.userId === userId) throw new BadRequestException('You can not buy your own products');
    const alredyInCart = await this.prisma.cart.findFirst({ where: { productId: id, userId }});
    
    if (alredyInCart) throw new BadRequestException('Product already in cart');
    
    const query = await this.prisma.cart.create({ data: {userId: userId, productId: id, ownerId: product.userId, date: newDate} });
    return query

  }

  async findCart(userId: number){
    const query = await this.prisma.cart.findMany({ where: { userId }, select: { product: { select: { product: true, description: true, quantity: true, price: true}}, date: true}});
    return query
  }

  async findCartProduct(id: number){
    const query = await this.prisma.cart.findUnique({ where: { id }, select: { product: { select: { product: true, description: true, quantity: true, price: true}}, date: true}})
    return query
  }
}
