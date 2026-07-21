import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AttachmentDocument,
  AttachmentSchemaName,
} from '../schemas/attachment.schema';

@Injectable()
export class AttachmentRepository {
  constructor(
    @InjectModel(AttachmentSchemaName)
    private readonly attachmentModel: Model<AttachmentDocument>,
  ) {}

  async create(data: Partial<AttachmentDocument>) {
    return this.attachmentModel.create(data);
  }

  async findByTask(taskId: string) {
    return this.attachmentModel
      .find({ task: taskId, isDeleted: false })
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return this.attachmentModel.findById(id);
  }

  async softDelete(id: string) {
    return this.attachmentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
}
