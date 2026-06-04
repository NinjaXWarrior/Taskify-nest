import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/auth/constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  
  private GetUser(token) {
    try {
      const decoded = jwt.verify(token, jwtConstants.secret);
      return decoded;
    } catch (err) {
      // err
      console.log(err);
      return null;
    }
  }

  private SetUser(user, request , context) {
      console.log('curr id ',user.id);
    request.user = user;
    console.log('user set' , context.switchToHttp().getRequest());
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string = request.headers.authorization.split(' ')[1];

    if (this.GetUser(token)) {
      const user = this.GetUser(token);
      this.SetUser(user, request , context);
      return true;
    }
    return false;
  }

}
