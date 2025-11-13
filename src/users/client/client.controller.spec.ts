import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
describe('ClientController', () => {
  let controller: ClientController;
  let app : INestApplication;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
  }
  ).compile();
    controller = module.get<ClientController>(ClientController);
    app = module.createNestApplication();
    app.use(cookieParser());
    await app.init();
     
  });
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '1d',
  });

 test('should return 200', async () => {
  const response = await request(app.getHttpServer())
    .get('/client')
    .set('Cookie', `ecommerceToken=${token}`);

  expect(response.statusCode).toBe(200);
});



test('should return 401', async () => {
  const response = await request(app.getHttpServer()).get('/client');
  expect(response.statusCode).toBe(401);
});

 


test('should return 200 and the products', async() =>{
  const response = await request(app.getHttpServer()).get('/client').set('Cookie', `ecommerceToken=${token}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeDefined();
})

});
