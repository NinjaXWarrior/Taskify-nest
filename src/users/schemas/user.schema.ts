import * as mongoose from 'mongoose';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },

  role: {
    type: String,
    enum: Roles,
    default: Roles.USER,
  },
});

export const UserSchemaName = 'User';
