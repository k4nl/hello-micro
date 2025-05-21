/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AwsQueue, SqsService } from '@k4nl/core';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AiService } from 'src/ai/ai.service';
import { AiTools } from 'src/ai/ai.tools';
import { Conversation } from 'src/ai/ai.types';
import { Events } from '../events';

@Injectable()
export class AnalyseMessageService {
  private readonly aiTools: AiTools;
  private readonly logger = new Logger(AnalyseMessageService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly sqsService: SqsService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.aiTools = new AiTools();
  }

  async execute(conversation: Conversation): Promise<void> {
    this.logger.debug({
      context: AnalyseMessageService.name,
      message: 'Executing analyse message service',
      conversation,
    });

    const response = await this.aiService.generateText(conversation);

    this.logger.debug({
      context: AnalyseMessageService.name,
      message: 'Response from AI service',
      response,
    });

    if (response.type === 'tool_call') {
      const tools = this.aiTools.getTools();

      const tool = tools.find(
        (tool) => tool.name === response.data[0].function.name,
      );

      if (!tool) {
        this.logger.error({
          context: AnalyseMessageService.name,
          message: 'Tool not found',
          toolName: response.data[0].function.name,
        });
        throw new Error('Tool not found');
      }

      const toolName = `${tool.name}.fifo`;

      const sqsQueue = Object.values(AwsQueue).find(
        (value) => (value as string) === toolName,
      );

      this.logger.debug({
        context: AnalyseMessageService.name,
        queueValues: Object.values(AwsQueue),
      });

      if (!sqsQueue) {
        this.logger.error({
          context: AnalyseMessageService.name,
          message: 'SQS queue not found',
          toolName: toolName,
        });
        throw new Error('SQS queue not found');
      }

      return this.sqsService.execute(sqsQueue, {
        tool: response.data,
        conversation,
      });
    }

    if (response.type === 'error') {
      this.logger.error({
        context: AnalyseMessageService.name,
        message: 'Error from AI service',
        error: response.content,
      });
      throw new Error(response.content);
    }

    if (response.type === 'reply') {
      this.logger.debug({
        context: AnalyseMessageService.name,
        message: 'Reply from AI service',
        reply: response.content,
      });

      conversation.messages.push({
        role: 'assistant',
        content: response.content as string,
      });

      this.eventEmitter.emit(Events.RespondUser, conversation);
    }
  }
}
