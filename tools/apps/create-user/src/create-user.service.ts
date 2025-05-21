/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  async execute(data?: { name: string }): Promise<string> {
    // aplica regras de negocio para criar um usuario
    return `User ${data?.name || ''} created successfully`;
  }
}
