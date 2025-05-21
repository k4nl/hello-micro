import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserService {
  getHello(): string {
    return 'Hello World!';
  }
}
