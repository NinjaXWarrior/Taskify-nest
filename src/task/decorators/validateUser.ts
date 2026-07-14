import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';

const User = createParamDecorator((data: any, context: ExecutionContext) => {
  const request: any = context.switchToHttp().getRequest();
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token: string = authHeader.split(' ')[1];

  try {
    return jwt.verify(token, jwtConstants.secret);
  } catch (err) {
    return null;
  }
});

export default User;
