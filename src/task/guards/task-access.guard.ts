import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TaskService } from '../task.service';

@Injectable()
export class TaskAccessGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const taskId = request.params.id;

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    if (!taskId) {
      return true;
    }

    const hasAccess = await this.taskService.validateUser(user.id, taskId);

    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
