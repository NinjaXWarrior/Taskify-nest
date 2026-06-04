import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Taskify')],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
