import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    try {
      return jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      return null;
    }
  },
);

export default GetUser;
