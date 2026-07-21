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
    return this.model
      .find({ createdBy: ownerId, isDeleted: false })
      .sort({ createdAt: -1 });
  }

  async find(filter: any, options: { skip?: number; limit?: number } = {}) {
    return this.model
      .find({ ...filter, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 10);
  }

  async count(filter: any) {
    return this.model.countDocuments({ ...filter, isDeleted: false });
  }
}
