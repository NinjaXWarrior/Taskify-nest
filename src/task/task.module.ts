import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
// import { TaskSchema, TaskSchemaName } from './schema/task.schema';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    // MongooseModule.forFeature([{ name: TaskSchemaName, schema: TaskSchema }]),
    AuthModule,
  ],
})
export class TaskModule {}
