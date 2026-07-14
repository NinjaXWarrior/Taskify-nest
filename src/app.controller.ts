import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'API home endpoint',
    description: 'Returns a welcome payload with the basic routes and Swagger docs location.',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome payload returned successfully',
    schema: {
      example: {
        status: 'success',
        message: 'Taskify API is running',
        version: '1.0.0',
        docs: '/api',
        endpoints: {
          auth: '/auth/register and /auth/login',
          tasks: '/task',
        },
      },
    },
  })
  getHello() {
    return this.appService.getHello();
  }
}
