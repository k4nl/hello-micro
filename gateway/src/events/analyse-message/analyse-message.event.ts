import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events';
import { AnalyseMessageService } from './analyse-message.service';
import { Conversation } from 'src/ai/ai.types';

@Injectable()
export class AnalyseMessageEvent {
  constructor(private readonly analyseMessageService: AnalyseMessageService) {}

  @OnEvent(Events.AnalyseMessage)
  analyseMessage(conversation: Conversation): void {
    this.analyseMessageService.execute(conversation);
  }
}
