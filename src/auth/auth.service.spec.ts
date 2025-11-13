import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

 test('should have the dto', async() => {
jest.spyOn(service, 'register').mockResolvedValue(({
  username: 'test',
  password: '1234',
  id: 1,

}  
));
const response = await service.register({ username: 'test', password: '1234' });
expect(response).toHaveProperty('username');
})

});
