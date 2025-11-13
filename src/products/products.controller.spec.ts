import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
describe('ProductsController', () => {
  let controller: ProductsController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();
    app = module.createNestApplication();
    app.use(cookieParser());
    await app.init();
    controller = module.get<ProductsController>(ProductsController);
  });

 const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '10s',
  });

  test('should return 200', async () => {
    const response = await request(app.getHttpServer()).get('/products')
    .set('Cookie', `ecommerceToken=${token}`);
    expect(response.statusCode).toBe(200);
  })
  test('should return 200', async () => {
    const response = await request(app.getHttpServer()).get('/products/1')
    .set('Cookie', `ecommerceToken=${token}`);
    expect(response.statusCode).toBe(200);
  })
    test('should return 200', async () => {
          jest.spyOn(controller, 'removeProduct').mockResolvedValue('Product deleted successfully');
      
      const result = await controller.removeProduct('1');
      expect(result).toBe('Product deleted successfully');
      expect(controller.removeProduct).toHaveBeenCalledWith('1');
    })


    test('should return 200', async () =>{

      const updateMock = {
        product: 'test',
        description: 'test',
        price: 1,
        quantity: 1
      }
      jest.spyOn(controller, 'updateProduct').mockResolvedValue('product updated successfully');

      const result = await controller.updateProduct('1', updateMock);
      expect(result).toBe('product updated successfully');
    })
});
