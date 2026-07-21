import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CommentRepository } from './repositories/comment.repository';
import { TaskRepository } from '../task/repositories/task.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly taskRepository: TaskRepository,
    private readonly notificationsService: NotificationsService,
    private readonly activityService: ActivityService,
  ) {}

  async createComment(taskId: string, user: any, dto: any) {
    const task = await this.taskRepository.findById(taskId);
    if (!task || task.isDeleted) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const comment = await this.commentRepository.create({
      task: new Types.ObjectId(taskId),
      author: new Types.ObjectId(user.id),
      content: dto.content,
      parentComment: dto.parentComment
        ? new Types.ObjectId(dto.parentComment)
        : null,
    });

    const recipient = task.assignedTo
      ? task.assignedTo.toString()
      : task.createdBy.toString();
    if (recipient !== user.id.toString()) {
      await this.notificationsService.createNotification(
        recipient,
        'COMMENT',
        `New comment on task ${task.title}`,
        'Task',
        taskId,
        `/tasks/${taskId}`,
      );
    }

    await this.activityService.logAction(
      user.id,
      'Comment added',
      'Task',
      taskId,
      {
        commentId: comment._id,
        parentComment: dto.parentComment || null,
      },
    );

    return { message: 'Comment created successfully', comment };
  }

  async listComments(taskId: string) {
    const comments = await this.commentRepository.findByTask(taskId);
    const results = await Promise.all(
      comments.map(async (comment) => {
        const replies = await this.commentRepository.findReplies(
          comment._id.toString(),
        );
        return { ...comment.toObject(), replies };
      }),
    );
    return { message: 'Comments fetched successfully', comments: results };
  }

  async updateComment(commentId: string, user: any, dto: any) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment || comment.isDeleted) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    if (comment.author.toString() !== user.id.toString()) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    const updated = await this.commentRepository.update(commentId, {
      content: dto.content,
    });
    await this.activityService.logAction(
      user.id,
      'Comment updated',
      'Comment',
      commentId,
      { taskId: comment.task.toString() },
    );
    return { message: 'Comment updated successfully', comment: updated };
  }

  async deleteComment(commentId: string, user: any) {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment || comment.isDeleted) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    if (comment.author.toString() !== user.id.toString()) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    const deleted = await this.commentRepository.softDelete(commentId);
    await this.activityService.logAction(
      user.id,
      'Comment deleted',
      'Comment',
      commentId,
      { taskId: comment.task.toString() },
    );
    return { message: 'Comment deleted successfully', comment: deleted };
  }
}
