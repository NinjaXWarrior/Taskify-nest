import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

console.log('MONGO_URI:', process.env.MONGO_URI);
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
