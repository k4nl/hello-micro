import { Module } from '@nestjs/common';
import { AnalyseMessageService } from './analyse-message.service';
import { AnalyseMessageEvent } from './analyse-message.event';
import { AiModule } from 'src/ai/ai.module';
import { AwsConfig, SqsService } from '@k4nl/core';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AiModule],
  providers: [
    AnalyseMessageService,
    AnalyseMessageEvent,
    SqsService,
    {
      provide: AwsConfig,
      useFactory: (configService: ConfigService) => {
        return new AwsConfig(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [AnalyseMessageService, AnalyseMessageEvent],
})
export class AnalyseMessageModule {}
