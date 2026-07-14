import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskify',
  jwtSecret: process.env.JWT_SECRET || 'AshdbajAFCSC562u472t823757TFE76T7EU',
};
