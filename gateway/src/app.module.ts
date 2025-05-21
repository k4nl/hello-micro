import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './http/http.module';
import { AnalyseMessageModule } from './events/analyse-message/analyse-message.module';
import { RespondUserModule } from './events/respond-user/respond-user.module';
import { ToolResponseModule } from './events/tool-response/tool-response.module';
import { AiModule } from './ai/ai.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    HttpModule,
    AnalyseMessageModule,
    RespondUserModule,
    ToolResponseModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    DatabaseModule,
    ConfigModule,
    HttpModule,
    AnalyseMessageModule,
    RespondUserModule,
    ToolResponseModule,
    AiModule,
  ],
})
export class AppModule {}
