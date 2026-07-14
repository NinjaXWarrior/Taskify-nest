import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export const TaskSchemaName = 'Task';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: Types.ObjectId;

  @Prop({
    default: Date.now,
  })
  createdOn: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
