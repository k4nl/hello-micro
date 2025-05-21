import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { DatabaseService } from 'src/infra/database/database.service';
import { WhatsAppWebhookPayload } from '../whatsapp/whatsapp.types';
import { NextFunction, Request, Response } from 'express';
import { ID, User } from '@k4nl/core';

export type UserRequest = Request & {
  user?: User;
};

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly database: DatabaseService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const body = req.body as WhatsAppWebhookPayload;

    const phone =
      body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id ?? null;

    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    const userModel = await this.database.user.findFirst({
      where: {
        phone,
      },
    });

    if (!userModel) {
      req.user = User.create({
        phone,
        email: '',
        name: '',
      });

      return next();
    }

    req.user = new User({
      id: new ID(userModel.id),
      phone: userModel.phone ?? undefined,
      email: userModel.email ?? '',
      name: userModel.name ?? '',
    });

    next();
  }
}
