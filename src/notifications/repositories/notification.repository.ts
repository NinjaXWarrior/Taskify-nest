import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationDocument,
  NotificationSchemaName,
} from '../schemas/notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationSchemaName)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(data: Partial<NotificationDocument>) {
    return this.notificationModel.create(data);
  }

  async find(filter: any, options: { skip?: number; limit?: number } = {}) {
    return this.notificationModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 20);
  }

  async markRead(notificationId: string) {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true },
    );
  }
}
