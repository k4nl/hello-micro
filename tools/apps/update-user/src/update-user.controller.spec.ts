import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from './update-user.service';

describe('UpdateUserController', () => {
  let updateUserController: UpdateUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [UpdateUserService],
    }).compile();

    updateUserController = app.get<UpdateUserController>(UpdateUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(updateUserController.getHello()).toBe('Hello World!');
    });
  });
});
