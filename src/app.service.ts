import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: 'success',
      message: 'Taskify API is running',
      version: '1.0.0',
      docs: '/api',
      endpoints: {
        auth: '/auth/register and /auth/login',
        tasks: '/task',
      },
    };
  }
}
