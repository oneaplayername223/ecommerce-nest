import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientGuard } from '../guards/client.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
@Post()
@UseGuards(ClientGuard)

  async createProduct(@Req() req: any, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.id
    const newProduct = await this.productsService.createProduct(createProductDto, userId);
    return {
      message: 'Product created successfully',
      product: {
        product: newProduct.product,
        description: newProduct.description,
        price: newProduct.price
      }
    }
  }

 @Get()
  findAllProducts() {
    const products = this.productsService.findAllProducts();
    return products
  }

 @Get('/products/')
 @UseGuards(ClientGuard)
  findUserProducts(@Req() req: any) {
    const userId: number = req.user.id
    const products = this.productsService.findUserProducts(userId);
    return products
  }

  @Get('/products/:id')
   @UseGuards(ClientGuard)

    findUserProduct(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
      const userId: number = req.user.id
      const products = this.productsService.findUserProduct(id, userId);
      return products
    }
  
      @Get(':id')
    findOneProduct(@Param('id') id: string) {
      if (isNaN(+id)) throw new BadRequestException('Id not valid');
      const product = this.productsService.findOneProduct(+id);
      return product
    }
  
  
    @Patch('/:id/')
    @UseGuards(ClientGuard)
      async updateProduct(@Param('id') id: string, @Body() updatedProductDto: UpdateProductDto) {
      const updatedProduct = this.productsService.updateProduct(+id, updatedProductDto);
      return 'Product updated successfully'
    }
    @Delete(':id')
        @UseGuards(ClientGuard)

    async removeProduct(@Param('id') id: string) {
      const deleteProduct = this.productsService.removeProduct(+id);
      return 'Product deleted successfully'
    }
  }