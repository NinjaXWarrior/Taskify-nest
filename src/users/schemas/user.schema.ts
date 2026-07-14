import * as mongoose from 'mongoose';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
  },
  {
    timestamps: true,
  },
);

export const UserSchemaName = 'User';
