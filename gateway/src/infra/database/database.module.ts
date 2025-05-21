import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
