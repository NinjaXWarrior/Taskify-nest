import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Task } from './interfaces/task.dto';
import { TaskService } from './task.service';
import GetUser from './decorators/validateUser';
import { User } from 'src/users/dtos/user.dto';
import { validateUser } from './guards/validateUser.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async addTask(@Body() task: Task, @GetUser() user : User) {
    const addedTask = this.taskService.addTask(task, user);

    return addedTask;
  }


  @UseGuards(validateUser)
  @Get()
  async listTask(@Request() req, @GetUser() user : User) {
    console.log(user.email);
    return this.taskService.listTasks(user);
  }

  @Get(':id')
  async listTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user,
  ) {
    console.log(user);
    if (user) {
      return this.taskService.listTaskById(id, user );
    }
    return 'access denied';
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    console.log(id);
    return this.taskService.deleteTask(id, user  );
  }

  @Put(':id')
  async putTask(@Param('id', ParseIntPipe) id: number, @Body() task: Task) {
    return this.taskService.putTask(id, task);
  }
}
