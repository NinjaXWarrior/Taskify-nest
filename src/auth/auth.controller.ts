import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authUser(@Body() payload) {
    console.log(payload);
    return this.authService.login(payload);
  }

  @Post('register')
  createUser(@Body() payload) {
    console.log(payload);
    return this.authService.createUser(payload);
  }
}
