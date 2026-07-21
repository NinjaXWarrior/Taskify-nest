import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import GetUser from '../common/decorators/get-user.decorator';
import { User } from '../users/dtos/user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateTaskDto } from './interfaces/update-task.dto';
import { CreateTaskDto } from './interfaces/create-task.dto';

@ApiTags('Task')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Creates a task for the currently authenticated user.',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({ description: 'Task created successfully' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  @ApiBadRequestResponse({
    description: 'Validation error for the request body',
  })
  addTask(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.addTask(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get tasks for current user',
    description: 'Returns tasks where the user is creator or assignee.',
  })
  @ApiOkResponse({ description: 'Tasks fetched successfully' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  listTasks(@Query() query: any, @GetUser() user: User) {
    return this.taskService.listTasks(user, query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a task by id',
    description:
      'Returns a single task if it belongs to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '688b2b7da6f3f4dd7d2e2a9b',
  })
  @ApiOkResponse({ description: 'Task fetched successfully' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  listTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.listTaskById(id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Soft deletes a task if the user has access.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '688b2b7da6f3f4dd7d2e2a9b',
  })
  @ApiOkResponse({ description: 'Task deleted successfully' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiOkResponse({ description: 'Task archived successfully' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  archiveTask(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.archiveTask(id, user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates a task if it belongs to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '688b2b7da6f3f4dd7d2e2a9b',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({ description: 'Task updated successfully' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid bearer token' })
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTask(id, dto, user);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign or reassign task' })
  @ApiBody({ schema: { example: { assigneeId: '684efb1f4db4d8f5e98b1234' } } })
  @ApiOkResponse({ description: 'Task assigned successfully' })
  assignTask(
    @Param('id') id: string,
    @Body() body: { assigneeId: string },
    @GetUser() user: User,
  ) {
    return this.taskService.assignTask(id, body.assigneeId, user);
  }

  @Patch(':id/unassign')
  @ApiOperation({ summary: 'Remove task assignment' })
  @ApiOkResponse({ description: 'Task assignment removed successfully' })
  removeAssignment(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.removeAssignment(id, user);
  }
}
