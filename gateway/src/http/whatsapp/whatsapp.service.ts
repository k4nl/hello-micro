import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from 'src/events/events';
import { Conversation } from 'src/ai/ai.types';

@Injectable()
export class WhatsAppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  execute(conversation: Conversation) {
    this.eventEmitter.emit(Events.AnalyseMessage, conversation);
  }
}
