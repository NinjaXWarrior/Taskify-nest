import * as mongoose from 'mongoose';

export enum Roles {
  ADMIN,
  USER,
}

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  userName: String,
//   role: Roles,
  id: String
});

export const UserSchemaName = 'User';
