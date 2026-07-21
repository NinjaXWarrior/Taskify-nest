import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, CommentSchemaName } from '../schemas/comment.schema';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentSchemaName)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(data: Partial<CommentDocument>) {
    return this.commentModel.create(data);
  }

  async findByTask(taskId: string) {
    return this.commentModel
      .find({ task: taskId, parentComment: null, isDeleted: false })
      .sort({ createdAt: -1 });
  }

  async findReplies(parentCommentId: string) {
    return this.commentModel
      .find({ parentComment: parentCommentId, isDeleted: false })
      .sort({ createdAt: 1 });
  }

  async findById(id: string) {
    return this.commentModel.findById(id);
  }

  async softDelete(id: string) {
    return this.commentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }

  async update(id: string, update: Partial<CommentDocument>) {
    return this.commentModel.findByIdAndUpdate(id, update, { new: true });
  }
}
