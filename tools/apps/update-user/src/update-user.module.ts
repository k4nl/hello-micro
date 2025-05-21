import { Module } from '@nestjs/common';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from './update-user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}
