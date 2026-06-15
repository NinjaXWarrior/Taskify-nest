import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dtos/register.dtos';
import { LoginDto } from '../users/dtos/login.dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      example: {
        message: 'created User successfully',
        user: {
          _id: '684efb1f4db4d8f5e98b1234',
          email: 'shiva@gmail.com',
          userName: 'shiva',
          role: 'USER',
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User already exists',
    schema: {
      example: {
        statusCode: 403,
        message: 'User already exists',
        error: 'Forbidden',
      },
    },
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.createUser(dto);
  }

  //   @Post('login')
  //   @ApiOperation({ summary: 'Login user' })
  //   @ApiBody({ type: LoginDto })
  //   login(@Body() dto: LoginDto) {
  //     return this.authService.login(dto);
  //   }
  // }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          _id: '684efb1f4db4d8f5e98b1234',
          email: 'shiva@gmail.com',
          userName: 'shiva',
          role: 'USER',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
