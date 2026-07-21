// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getHello() {
//     return {
//       status: 'success',
//       message: 'Taskify API is running',
//       version: '1.0.0',
//       docs: '/api',
//       endpoints: {
//         auth: '/auth/register and /auth/login',
//         tasks: '/task',
//       },
//     };
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly startedAt = new Date();

  getHello() {
    return {
      '🚀 Taskify API': {
        Status: 'Online ✅',
        Version: 'v1.0.0',
        'Server Restart': this.getUptime(),
        'API Docs': '/api',
        'Available Routes': {
          'POST /auth/register': 'Register a new user',
          'POST /auth/login': 'Login user',
          'GET /task': 'Task endpoints',
          'GET /health': 'Health check',
        },
      },
    };
  }

  private getUptime(): string {
    const diff = Date.now() - this.startedAt.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }

    if (minutes > 0) {
      return `${minutes}m ago`;
    }

    return `${Math.floor(diff / 1000)}s ago`;
  }
}
