import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  imports : [
    MongooseModule.forRoot(
    'mongodb://127.0.0.1:27017/task')],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule {}
