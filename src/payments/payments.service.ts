import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PaymentsService {
    private prisma = new PrismaClient()
    async buyProduct(id: number, userId: number, quantityToBuy: number) {
        const validUser = this.prisma.user.findFirst({ where: { id: userId } });
        if (!validUser) throw new Error('User not found');
      
        const query = await this.prisma.product.findUnique({ where: {id}, select: { quantity: true, userId: true} });
        if (!query) throw new NotFoundException('Product not found');
        if (query.userId === userId) throw new BadRequestException("You cannot buy your own products");

        const result = query.quantity - quantityToBuy
        if (quantityToBuy > query.quantity) throw new BadRequestException('Not enough quantity');
      
        const inventoryDiscount = await this.prisma.product.update({ where: { id }, data: { quantity: result } });
      
        const newTransaction = await this.prisma.transactions.create({ data: { userId, productId: id, quantity: quantityToBuy, total: inventoryDiscount.price * quantityToBuy } });
      
        return newTransaction
      }

    findPayments(userId: number) {
      return this.prisma.transactions.findMany({ where: {userId}, select: { product: {select: {product: true, description: true, price: true}}, quantity: true, total: true }});

    }
}
