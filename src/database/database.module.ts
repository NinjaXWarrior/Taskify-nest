import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';

console.log('MONGO_URI:', process.env.MONGO_URI);
@Module({
  // imports: [MongooseModule.forRoot(process.env.MONGO_URI)],
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 5000,
    }),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
