import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/repositories/base.repository';
import { TaskDocument, TaskSchemaName } from '../schema/task.schema';

@Injectable()
export class TaskRepository extends BaseRepository<TaskDocument> {
  constructor(@InjectModel(TaskSchemaName) model: Model<TaskDocument>) {
    super(model);
  }

  async findByOwner(ownerId: string) {
    return this.model.find({ createdBy: ownerId }).sort({ createdAt: -1 });
  }
}
