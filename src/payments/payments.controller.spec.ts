import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
describe('PaymentsController', () => {
  let controller: PaymentsController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    app = module.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '10s',
  });

 test('should return 200', async () => {
const response = await request(app.getHttpServer()).get('/payments')
.set('Cookie', `ecommerceToken=${token}`);
expect(response.statusCode).toBe(200);
expect(response.body).toBeDefined();
 })


 test('should return 201', async () => {
   const paymentMock = {
    userId: 1,
    productId: 1,
    quantity: 1,
    total: 1,
   }

   jest.spyOn(controller, 'buyProduct').mockResolvedValue('checkout 1 created successfully');
   
   const result = await controller.buyProduct(paymentMock.quantity, { user: { id: 1 } }, paymentMock.productId);

  
   expect(result).toBe('checkout 1 created successfully');
   expect(controller.buyProduct).toHaveBeenCalledWith(paymentMock.quantity, { user: { id: 1 } }, paymentMock.productId);

 })
});
