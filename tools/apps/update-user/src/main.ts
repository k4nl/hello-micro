import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import {
  AwsConfig,
  AwsQueue,
  SqsTransporter,
  SqsTransporterOptions,
} from '@k4nl/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { UpdateUserModule } from './update-user.module';

dotenv.config({ path: '../../../.env' });

async function bootstrap() {
  const configService = new ConfigService();

  const sqsConfigService = new AwsConfig(configService);
  const options: SqsTransporterOptions = {
    queues_name: AwsQueue.UPDATE_USER as AwsQueue,
    max_number_of_messages: 10,
    polling_time_seconds: 20,
  };

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UpdateUserModule,
      {
        strategy: new SqsTransporter(sqsConfigService, options),
      },
    );

  await microservice.listen();
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
