import { Body, Controller, Post, Req } from '@nestjs/common';
import { WhatsAppWebhookPayload } from './whatsapp.types';
import { WhatsAppService } from './whatsapp.service';
import { Conversation } from 'src/ai/ai.types';
import { UserRequest } from '../middlewares/user.middleware';
import { User } from '@k4nl/core';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post()
  handleWebhook(@Body() body: WhatsAppWebhookPayload, @Req() req: UserRequest) {
    const conversation: Conversation = {
      messages: body.entry.map((entry) => ({
        content: entry.changes?.[0]?.value?.messages?.[0]?.text?.body ?? '',
        role: 'user',
      })),
      user: req.user as User,
    };

    return this.whatsappService.execute(conversation);
  }
}
