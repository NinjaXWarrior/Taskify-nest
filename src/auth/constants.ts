import { env } from '../common/config/env.config';

export const jwtConstants = {
  secret: env.jwtSecret,
};
