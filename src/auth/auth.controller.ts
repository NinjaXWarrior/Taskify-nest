import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from '../users/dtos/register.dtos';
import { LoginDto } from '../users/dtos/login.dtos';

import { ForgotPasswordDto } from '../users/dtos/forgot-password.dto';
import { ResetPasswordDto } from '../users/dtos/reset-password.dto';
import { ChangePasswordDto } from '../users/dtos/change-password.dto';
import { UseGuards, Request, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { RefreshTokenDto } from '../users/dtos/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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

  @Public()
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

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @Public()
  @Post('logout')
  @ApiOperation({ summary: 'Logout user (invalidate refresh token)' })
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset link' })
  forgot(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  reset(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiOperation({ summary: 'Change password (authenticated)' })
  change(@Request() req, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account')
  @ApiOperation({ summary: 'Delete current authenticated account' })
  @ApiOkResponse({
    description: 'Account deleted successfully',
    schema: {
      example: {
        message: 'Account deleted successfully',
        timestamp: '2026-07-21T12:34:56.789Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
      },
    },
  })
  deleteAccount(@Request() req) {
    return this.authService.deleteAccount(req.user);
  }
}
