import { Test, TestingModule } from '@nestjs/testing';
import { GetUserController } from './get-user.controller';
import { GetUserService } from './get-user.service';

describe('GetUserController', () => {
  let getUserController: GetUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [GetUserService],
    }).compile();

    getUserController = app.get<GetUserController>(GetUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(getUserController.getHello()).toBe('Hello World!');
    });
  });
});
