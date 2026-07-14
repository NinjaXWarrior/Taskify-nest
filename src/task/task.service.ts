import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { User } from '../users/dtos/user.dto';
import { UpdateTaskDto } from './interfaces/update-task.dto';
import { CreateTaskDto } from './interfaces/create-task.dto';
import { TaskRepository } from './repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async validateUser(userId: string, taskId: string): Promise<boolean> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      return false;
    }

    return task.createdBy.toString() === userId.toString();
  }

  async addTask(dto: CreateTaskDto, user: User) {
    const task = await this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      createdBy: new Types.ObjectId(user.id),
      createdOn: new Date(),
    });

    return {
      message: 'Task created successfully',
      timestamp: new Date().toISOString(),
      task,
    };
  }

  async listTasks(user: User) {
    const tasks = await this.taskRepository.findByOwner(user.id);

    return {
      message: 'Tasks fetched successfully',
      timestamp: new Date().toISOString(),
      tasks,
    };
  }

  async listTaskById(id: string, user: User) {
    const task = await this.ensureOwnedTask(id, user);

    return {
      message: 'Task fetched successfully',
      timestamp: new Date().toISOString(),
      task,
    };
  }

  private async ensureOwnedTask(id: string, user: User) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    if (task.createdBy.toString() !== user.id.toString()) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    return task;
  }

  async deleteTask(id: string, user: User) {
    const task = await this.ensureOwnedTask(id, user);

    await task.deleteOne();

    return {
      message: 'Task deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }

  async updateTask(id: string, dto: UpdateTaskDto, user: User) {
    const task = await this.ensureOwnedTask(id, user);

    Object.assign(task, dto);
    await task.save();

    return {
      message: 'Task updated successfully',
      timestamp: new Date().toISOString(),
      task,
    };
  }
}
