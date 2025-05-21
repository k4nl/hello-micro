import { Controller, Get } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';

@Controller()
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Get()
  getHello(): string {
    return this.updateUserService.getHello();
  }
}
