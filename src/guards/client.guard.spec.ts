import {INestApplication } from '@nestjs/common';
import { ClientGuard } from './client.guard';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { ClientController } from '../users/client/client.controller';
import { ClientService } from '../users/client/client.service';
import cookieParser from 'cookie-parser';
describe('ClientGuard', () => {
  let app: INestApplication;

 beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientGuard, ClientService],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
  })
  
  test('should return 200', async () => {
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '1d',
  });

  const response = await request(app.getHttpServer())
    .get('/client')
    .set('Cookie', `ecommerceToken=${token}`);

  expect(response.status).toBe(200);
});


    test('should return 403 without token', async () => {
    await request(app.getHttpServer())
      .get('/client')
      .expect(401);
  });


  
});
