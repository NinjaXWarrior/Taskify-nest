import { Document } from 'mongoose';

export interface user extends Document {
  readonly email: string;
  password: string;
  userName: string;
  role: Roles;
  id: string;
}

export enum Roles {
  ADMIN,
  USER,
}
