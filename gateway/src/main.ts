import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import {
  AwsConfig,
  AwsQueue,
  SqsTransporterOptions,
  SqsTransporter,
} from '@k4nl/core';
import { MicroserviceOptions } from '@nestjs/microservices';

dotenv.config({ path: '../../../env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const sqsConfigService = new AwsConfig(configService);

  const options: SqsTransporterOptions = {
    queues_name: [AwsQueue.GATEWAY, AwsQueue.TOOL_RESPONSE],
    max_number_of_messages: 10,
    polling_time_seconds: 20,
  };

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      strategy: new SqsTransporter(sqsConfigService, options),
    });

  await microservice.listen();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
