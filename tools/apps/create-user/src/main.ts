import { NestFactory } from '@nestjs/core';
import { CreateUserModule } from './create-user.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  AwsConfig,
  AwsQueue,
  SqsTransporter,
  SqsTransporterOptions,
} from '@k4nl/core';

dotenv.config({ path: '../../../.env' });

async function bootstrap() {
  const configService = new ConfigService();

  const sqsConfigService = new AwsConfig(configService);
  const options: SqsTransporterOptions = {
    queues_name: AwsQueue.CREATE_USER as AwsQueue,
    max_number_of_messages: 10,
    polling_time_seconds: 20,
  };

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      CreateUserModule,
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
