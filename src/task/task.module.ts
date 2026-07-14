import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

import { TaskSchema, TaskSchemaName } from './schema/task.schema';
import { AuthModule } from '../auth/auth.module';
import { TaskAccessGuard } from './guards/task-access.guard';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskSchemaName,
        schema: TaskSchema,
      },
    ]),
    AuthModule,
  ],

  controllers: [TaskController],

  providers: [TaskService, TaskAccessGuard, TaskRepository],
})
export class TaskModule {}
