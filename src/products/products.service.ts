import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

async createProduct(createProductDto: CreateProductDto, userId: number) {
  const { id, ...data } = createProductDto
const query = await this.prisma.product.create({ data: { ...data, userId } });
return query
  }


 async findAllProducts() {

    const products = await this.prisma.product.findMany({select: {product: true, description: true, quantity: true, price: true, user: {select: {username: true}}}});
    return products
  }

   findOneProduct(id: number) {
    if (!id) throw new Error('Product id is required');
    return this.prisma.product.findUnique({ where: { id }, select: { product: true, description: true, quantity: true, price: true, user: { select: { username: true }} }});
  
  
  }


  async updateProduct(id: number, updatedProductDto: UpdateProductDto) {
     return await this.prisma.product.update({data: {...updatedProductDto}, where: {id}});
   }
 
   async removeProduct(id: number): Promise<any> {
    return this.prisma.product.delete({ where: { id }})
  }

  findUserProducts(userId: number) {
    if (!userId) throw new BadRequestException('User id is required');
    return this.prisma.product.findMany({ where: { userId } });
  }

  findUserProduct(id: number, userId: number){
    return this.prisma.product.findFirst({ where: { id, userId } });
  }
}
