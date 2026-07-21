import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchemaName = 'Notification';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Types.ObjectId, refPath: 'targetType', required: false })
  targetId: Types.ObjectId;

  @Prop({ required: false })
  targetType: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: String, default: null })
  link: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
