import { Document } from 'mongoose';

export interface user extends Document {
    readonly email: string,
    password: String,
    userName: String,
    role: Roles,
    id: String
  }

export enum Roles {
    ADMIN,
    USER,
  }