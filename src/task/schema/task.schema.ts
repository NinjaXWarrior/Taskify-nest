import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskPriority } from '../interfaces/task-priority.enum';
import { TaskStatus } from '../interfaces/task-status.enum';

export type TaskDocument = HydratedDocument<Task>;

export const TaskSchemaName = 'Task';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Prop({
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Prop({ type: Date, default: null })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assignedTo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', default: null })
  project: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  labels: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Number, default: 0 })
  estimatedHours: number;

  @Prop({ type: Number, default: 0 })
  actualHours: number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
