import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AttachmentRepository } from './repositories/attachment.repository';
import { TaskRepository } from '../task/repositories/task.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    private readonly taskRepository: TaskRepository,
    private readonly notificationsService: NotificationsService,
    private readonly activityService: ActivityService,
  ) {}

  async uploadAttachment(taskId: string, user: any, file: Express.Multer.File) {
    const task = await this.taskRepository.findById(taskId);
    if (!task || task.isDeleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const attachment = await this.attachmentRepository.create({
      task: new Types.ObjectId(taskId),
      uploadedBy: new Types.ObjectId(user.id),
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      isDeleted: false,
    });

    const recipient = task.assignedTo
      ? task.assignedTo.toString()
      : task.createdBy.toString();
    if (recipient !== user.id.toString()) {
      await this.notificationsService.createNotification(
        recipient,
        'ATTACHMENT',
        `New file attached to task ${task.title}`,
        'Task',
        taskId,
        `/tasks/${taskId}`,
      );
    }

    await this.activityService.logAction(
      user.id,
      'Attachment uploaded',
      'Task',
      taskId,
      {
        attachmentId: attachment._id,
        filename: attachment.originalname,
      },
    );

    return { message: 'Attachment uploaded successfully', attachment };
  }

  async listAttachments(taskId: string) {
    const task = await this.taskRepository.findById(taskId);
    if (!task || task.isDeleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    const attachments = await this.attachmentRepository.findByTask(taskId);
    return { message: 'Attachments fetched successfully', attachments };
  }

  async getAttachment(id: string, user: any) {
    const attachment = await this.attachmentRepository.findById(id);
    if (!attachment || attachment.isDeleted) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
    const task = await this.taskRepository.findById(attachment.task.toString());
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    if (
      task.createdBy.toString() !== user.id.toString() &&
      task.assignedTo?.toString() !== user.id.toString()
    ) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    return attachment;
  }

  async deleteAttachment(id: string, user: any) {
    const attachment = await this.attachmentRepository.findById(id);
    if (!attachment || attachment.isDeleted) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
    const task = await this.taskRepository.findById(attachment.task.toString());
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    if (
      task.createdBy.toString() !== user.id.toString() &&
      task.assignedTo?.toString() !== user.id.toString()
    ) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    const deleted = await this.attachmentRepository.softDelete(id);
    await this.activityService.logAction(
      user.id,
      'Attachment deleted',
      'Attachment',
      id,
      { taskId: attachment.task.toString() },
    );
    return { message: 'Attachment deleted successfully', attachment: deleted };
  }
}
