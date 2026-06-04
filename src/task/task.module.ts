import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { TaskSchema, TaskSchemaName } from './schema/task.schema';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    // MongooseModule.forFeature([{ name: TaskSchemaName, schema: TaskSchema }]),
    AuthModule
  ],
})
export class TaskModule {}
