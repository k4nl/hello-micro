import { Module } from '@nestjs/common';
import { ToolResponseController } from './tool-response.controller';
import { AnalyseMessageModule } from '../analyse-message/analyse-message.module';

@Module({
  imports: [AnalyseMessageModule],
  controllers: [ToolResponseController],
  exports: [],
  providers: [],
})
export class ToolResponseModule {}
