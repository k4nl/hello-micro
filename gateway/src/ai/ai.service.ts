import { Injectable, Logger } from '@nestjs/common';
import { Conversation, GenerateTextResponse } from './ai.types';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateText(
    conversation: Conversation,
  ): Promise<GenerateTextResponse> {
    this.logger.debug({
      message: 'Generating text',
      conversation,
      context: AiService.name,
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        const response: GenerateTextResponse = {
          type: 'tool_call',
          data: [
            {
              id: '123',
              function: {
                name: 'create-user',
                description: 'Cria um usuario',
                parameters: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Nome do usuario',
                    },
                    age: {
                      type: 'integer',
                      description: 'Idade do usuario',
                    },
                  },
                  required: ['name', 'age'],
                },
              },
            },
          ],
        };
        resolve(response);
      }, 1000);
    });
  }
}
