import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ActivityRepository } from './repositories/activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async logAction(
    userId: string,
    action: string,
    targetType: string,
    targetId?: string,
    metadata: any = {},
  ) {
    await this.activityRepository.create({
      user: new Types.ObjectId(userId),
      action,
      targetType,
      targetId: targetId ? new Types.ObjectId(targetId) : undefined,
      metadata,
    });
  }

  async listActivities(
    filter: any = {},
    options: { skip?: number; limit?: number } = {},
  ) {
    return this.activityRepository.find(filter, options);
  }
}
