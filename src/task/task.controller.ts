import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
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
  @ApiCreatedResponse({
    description: 'Task created successfully',
    schema: {
      example: {
        message: 'Task created successfully',
        timestamp: '2026-07-15T00:00:00.000Z',
        task: {
          _id: '688b2b7da6f3f4dd7d2e2a9b',
          title: 'Learn NestJS',
          description: 'Complete CRUD API with MongoDB',
          createdBy: '684efb1f4db4d8f5e98b1234',
          createdOn: '2026-07-15T00:00:00.000Z',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid bearer token',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error for the request body',
  })
  addTask(@Body() dto: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.addTask(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Returns all tasks owned by the authenticated user.',
  })
  @ApiOkResponse({
    description: 'Tasks fetched successfully',
    schema: {
      example: {
        message: 'Tasks fetched successfully',
        timestamp: '2026-07-15T00:00:00.000Z',
        tasks: [
          {
            _id: '688b2b7da6f3f4dd7d2e2a9b',
            title: 'Learn NestJS',
            description: 'Complete CRUD API with MongoDB',
            createdBy: '684efb1f4db4d8f5e98b1234',
            createdOn: '2026-07-15T00:00:00.000Z',
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid bearer token',
  })
  listTasks(@GetUser() user: User) {
    return this.taskService.listTasks(user);
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
  @ApiOkResponse({
    description: 'Task fetched successfully',
    schema: {
      example: {
        message: 'Task fetched successfully',
        timestamp: '2026-07-15T00:00:00.000Z',
        task: {
          _id: '688b2b7da6f3f4dd7d2e2a9b',
          title: 'Learn NestJS',
          description: 'Complete CRUD API with MongoDB',
          createdBy: '684efb1f4db4d8f5e98b1234',
          createdOn: '2026-07-15T00:00:00.000Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
    schema: {
      example: {
        statusCode: 403,
        message: 'Access denied',
        error: 'Forbidden',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid bearer token',
  })
  listTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.listTaskById(id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task only if it belongs to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '688b2b7da6f3f4dd7d2e2a9b',
  })
  @ApiOkResponse({
    description: 'Task deleted successfully',
    schema: {
      example: {
        message: 'Task deleted successfully',
        timestamp: '2026-07-15T00:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
    schema: {
      example: {
        statusCode: 403,
        message: 'Access denied',
        error: 'Forbidden',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid bearer token',
  })
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates a task only if it belongs to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '688b2b7da6f3f4dd7d2e2a9b',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({
    description: 'Task updated successfully',
    schema: {
      example: {
        message: 'Task updated successfully',
        timestamp: '2026-07-15T00:00:00.000Z',
        task: {
          _id: '688b2b7da6f3f4dd7d2e2a9b',
          title: 'Learn NestJS',
          description: 'Complete CRUD API with MongoDB',
          createdBy: '684efb1f4db4d8f5e98b1234',
          createdOn: '2026-07-15T00:00:00.000Z',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiForbiddenResponse({
    description: 'The task does not belong to this user',
    schema: {
      example: {
        statusCode: 403,
        message: 'Access denied',
        error: 'Forbidden',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid bearer token',
  })
  updateTask(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTask(id, dto, user);
  }
}
