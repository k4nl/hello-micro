/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsAppService } from './whatsapp.service';
// import { UserMiddleware } from '../middlewares/user.middleware';

@Module({
  imports: [],
  controllers: [WhatsappController],
  providers: [WhatsAppService],
  exports: [WhatsAppService],
})
export class WhatsappModule {}
// export class WhatsappModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserMiddleware).forRoutes(WhatsappController);
//   }
// }
