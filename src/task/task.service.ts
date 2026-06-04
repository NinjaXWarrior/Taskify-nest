import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/dtos/user.dto';
import { Task } from './interfaces/task.dto';
// import { TaskDocument, TaskSchema, TaskSchemaName } from './schema/task.schema';

@Injectable()
export class TaskService  {
  // constructor(@InjectModel(TaskSchemaName) private taskModel: Model<TaskDocument>)

  private tasks: Task[] = [];

  validateUser(userId : string, id : number ) : boolean{
    const result = this.tasks.find((item) => item.id === id);
    if (result.createdBy == userId) {
      return true;
    } else {
     return false
    }
  }

  addTask(task: Task, user: User): Task {
    const taskToAdd: Task = {
      title: task.title,
      id: this.tasks.length + 1,
      description: task.description,
      createdOn: new Date(),
      createdBy: user.id,
    };
    this.tasks.push(taskToAdd);
    return taskToAdd;
  }

  deleteTask(id: number, user : User) : Task {
    const result = this.tasks.find((item) => item.id === id);
    if (result.createdBy == user.id) {
        this.tasks.splice(id - 1, 1);
      return result;
    } else {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }

  listTaskById(id: number, user): Task {
    // console.log(typeof Number(id));
    // console.log(this.tasks.find((item) => item.id === id));
    const result = this.tasks.find((item) => item.id === id);
    if (result.createdBy == user.id) {
      return result;
    } else {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }

  listTasks(user) {
    const result = this.tasks.filter((task) => task.createdBy === user.id);
    return result;
  }

  putTask(id: number, task: Task) {
    this.tasks[id - 1] = task;
    return this.tasks;
  }
}
