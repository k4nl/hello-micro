/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Logger } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { AwsQueue, SqsContext, SqsService, User } from '@k4nl/core';

@Controller()
export class CreateUserController {
  private readonly logger = new Logger(CreateUserController.name);

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly sqsService: SqsService,
  ) {}

  @MessagePattern(AwsQueue.CREATE_USER)
  async execute(@Ctx() context: SqsContext, @Payload() payload: any) {
    this.logger.debug({
      message: '[Context] Handling create lead request',
      data: context.getMessage(),
      pattern: context.getPattern(),
    });

    this.logger.debug({
      message: '[Payload] Handling create lead request',
      data: payload,
    });

    const message = context.getMessage();

    if (!message || !message.Body) {
      throw new Error('Message not found');
    }

    const body = JSON.parse(message.Body);

    const response = await this.createUserService.execute(body);

    this.logger.debug({
      message: '[Response] Handling create lead request',
      data: response,
    });

    return this.sqsService.execute(AwsQueue.TOOL_RESPONSE, {
      conversation: {
        user: User.create({
          email: 'user@email.com',
          name: '1234567',
          phone: '1234567',
        }),
        messages: [
          {
            role: 'tool',
            content: body,
          },
        ],
      },
    });
  }
}
