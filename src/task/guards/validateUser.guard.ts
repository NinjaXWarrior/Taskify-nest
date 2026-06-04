import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskService } from '../task.service';

@Injectable()
export class validateUser implements CanActivate {
  constructor(private taskService: TaskService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('second middleware', request.user);
    const token: string = request.headers.authorization.split(' ')[1];
    return this.taskService.validateUser(request.user, request.param);
  }
}
