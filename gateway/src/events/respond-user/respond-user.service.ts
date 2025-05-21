import { Injectable, Logger } from '@nestjs/common';
import { Conversation } from 'src/ai/ai.types';

@Injectable()
export class RespondUserService {
  private readonly logger = new Logger(RespondUserService.name);

  execute(conversation: Conversation): void {
    // Chama a API da Meta para responder o usuario

    this.logger.log({
      context: RespondUserService.name,
      message: 'Executing respond user service',
      conversation,
    });
  }
}
