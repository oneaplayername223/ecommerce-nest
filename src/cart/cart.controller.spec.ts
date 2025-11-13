import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import jwt from 'jsonwebtoken';
describe('CartController', () => {
  let controller: CartController;
  let app : INestApplication;
  let service : CartService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService],
    }).compile();
    app = module.createNestApplication();
    app.use(cookieParser());
    await app.init();
    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '10s',
    })


   const mock: any = [{
    product: 'test',
    description: 'test',
    price: 1,
    quantity: 1,
  },
  {
  date: new Date().toISOString(),  
}
]

  test('should return 200', async() => {
  
    const response = await request(app.getHttpServer()).get('/cart')
    .set('Cookie', `ecommerceToken=${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    const found = response.body.some((i: any) => i.date);
    expect(found).toBe(true);
    
  });

 
  test('should return 201', async() => {
  const cartMock = jest.spyOn(service, 'addToCart').mockResolvedValue(mock);

  const result = await service.addToCart(1, 1);

  expect(result).toBe(mock);
  expect(service.addToCart).toHaveBeenCalledWith(1, 1);

  })

test('should return 200', async() => {
  const response = await request(app.getHttpServer()).get('/cart')
  .set('Cookie', `ecommerceToken=${token}`);
  expect(response.statusCode).toBe(200);
})

test('should return 200', async() => {
  const response = await request(app.getHttpServer()).get('/cart/1')
  .set('Cookie', `ecommerceToken=${token}`);
  expect(response.statusCode).toBe(200);
})



});
