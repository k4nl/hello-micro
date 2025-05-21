import { Injectable } from '@nestjs/common';
import { RespondUserService } from './respond-user.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from '../events';
import { Conversation } from 'src/ai/ai.types';

@Injectable()
export class RespondUserEvent {
  constructor(private readonly respondUserService: RespondUserService) {}

  @OnEvent(Events.RespondUser)
  respondUser(conversation: Conversation): void {
    this.respondUserService.execute(conversation);
  }
}
