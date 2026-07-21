import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { NotificationRepository } from './repositories/notification.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createNotification(
    userId: string,
    type: string,
    message: string,
    targetType?: string,
    targetId?: string,
    link?: string,
  ) {
    return this.notificationRepository.create({
      user: new Types.ObjectId(userId),
      type,
      message,
      targetType,
      targetId: targetId ? new Types.ObjectId(targetId) : undefined,
      link: link || null,
      read: false,
    });
  }

  async listNotifications(userId: string, query: any) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 20;
    const skip = (page - 1) * limit;

    return this.notificationRepository.find(
      {
        user: userId,
        ...('read' in query ? { read: query.read === 'true' } : {}),
      },
      { skip, limit },
    );
  }

  async markAsRead(notificationId: string) {
    return this.notificationRepository.markRead(notificationId);
  }
}
