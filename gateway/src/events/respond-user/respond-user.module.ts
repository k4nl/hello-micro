import { Module } from '@nestjs/common';
import { RespondUserEvent } from './respond-user.event';
import { RespondUserService } from './respond-user.service';

@Module({
  imports: [],
  providers: [RespondUserEvent, RespondUserService],
  exports: [RespondUserEvent, RespondUserService],
})
export class RespondUserModule {}
