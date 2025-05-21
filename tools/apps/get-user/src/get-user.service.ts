import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserService {
  getHello(): string {
    return 'Hello World!';
  }
}
