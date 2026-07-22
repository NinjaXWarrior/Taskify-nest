import { Document } from 'mongoose';

export interface user extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  userName: string;
  password: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  refreshTokens: string[];
  isDeleted: boolean;
}

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TEAM_LEAD = 'TEAM_LEAD',
  EMPLOYEE = 'EMPLOYEE',
  USER = 'USER',
}

//controllers\\dto//repository/service/appModule
//decorators// common
//middleware
//projects
