import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttachmentSchema,
  AttachmentSchemaName,
} from './schemas/attachment.schema';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { AttachmentRepository } from './repositories/attachment.repository';
import { TaskModule } from '../task/task.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttachmentSchemaName, schema: AttachmentSchema },
    ]),
    TaskModule,
    NotificationsModule,
    ActivityModule,
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, AttachmentRepository],
})
export class AttachmentsModule {}
