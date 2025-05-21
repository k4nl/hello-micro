import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { CreateUserService } from './create-user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsConfig, SqsService } from '@k4nl/core';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    SqsService,
    {
      provide: AwsConfig,
      useFactory: (configService: ConfigService) => {
        return new AwsConfig(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class CreateUserModule {}
