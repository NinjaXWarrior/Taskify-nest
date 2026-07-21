import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ActivityDocument,
  ActivitySchemaName,
} from '../schemas/activity.schema';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(ActivitySchemaName)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}

  async create(data: Partial<ActivityDocument>) {
    return this.activityModel.create(data);
  }

  async find(filter: any, options: { skip?: number; limit?: number } = {}) {
    return this.activityModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 20);
  }
}
