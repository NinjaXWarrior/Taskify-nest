import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private getUser(token: string) {
    try {
      return jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      return null;
    }
  }

  private setUser(user: any, request: any) {
    request.user = user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    const user = this.getUser(token);

    if (user) {
      this.setUser(user, request);
      return true;
    }

    throw new UnauthorizedException('Invalid or expired token');
  }
}
