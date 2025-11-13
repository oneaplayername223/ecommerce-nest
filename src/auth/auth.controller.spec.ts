import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { INestApplication } from '@nestjs/common';
import  request from 'supertest';
describe('AuthController', () => {
  let controller: AuthController;
  let app : INestApplication;
  let service : AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  test('should return 200', async() => {
    const response = await request(app.getHttpServer()).post('/auth/login').send({username: 'test', password: 'test'});
    expect(response.statusCode).toBe(200);
    
  })

  test('should return 400', async() => {
    const response = await request(app.getHttpServer()).post('/auth/login').send({username: 'test'});
    expect(response.statusCode).toBe(400);
  })

  test('should return 404', async() => {
    const response = await request(app.getHttpServer()).post('/auth/login').send({username: 'notFound', password: 'notFound'});
    expect(response.statusCode).toBe(404);
  })

 test('should return 201', async () => {
  jest.spyOn(service, 'register').mockResolvedValue({  
  username: 'test',
  password: '1234',
  id: 1,
});

  const usuarios = await service.register({ username: 'tests', password: 'test' });
  expect(usuarios).toHaveProperty('username');
});

});
