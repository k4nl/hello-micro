import { Controller, Logger } from '@nestjs/common';
import { AnalyseMessageService } from '../analyse-message/analyse-message.service';
import { MessagePattern, Ctx } from '@nestjs/microservices';
import { AwsQueue, SqsContext } from '@k4nl/core';

@Controller()
export class ToolResponseController {
  private readonly logger = new Logger(ToolResponseController.name);

  constructor(private readonly analyseMessageService: AnalyseMessageService) {}

  @MessagePattern(AwsQueue.TOOL_RESPONSE)
  async execute(@Ctx() context: SqsContext) {
    this.logger.debug({
      context: ToolResponseController.name,
      message: 'Executing tool response controller',
      data: context,
    });

    const message = context.getMessage();

    if (!message || !message.Body) {
      this.logger.error({
        context: ToolResponseController.name,
        message: 'Message not found',
      });
      throw new Error('Message not found');
    }

    const body = JSON.parse(message.Body);

    if (!body || !body.conversation) {
      this.logger.error({
        context: ToolResponseController.name,
        message: 'Conversation not found',
      });
      throw new Error('Conversation not found');
    }

    await this.analyseMessageService.execute(body.conversation);
  }
}
