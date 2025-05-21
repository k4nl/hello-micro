import { Module } from '@nestjs/common';
import { GetUserController } from './get-user.controller';
import { GetUserService } from './get-user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [GetUserController],
  providers: [GetUserService],
})
export class GetUserModule {}
