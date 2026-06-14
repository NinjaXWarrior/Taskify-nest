// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   authUser(@Body() payload) {
//     console.log(payload);
//     return this.authService.login(payload);
//   }

//   @Post('register')
//   createUser(@Body() payload) {
//     console.log(payload);
//     return this.authService.createUser(payload);
//   }
// }

// import { Body, Controller, Post } from '@nestjs/common';
// import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
// import { AuthService } from './auth.service';
// import { User } from '../users/dtos/user.dto';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   @ApiOperation({ summary: 'Register new user' })
//   @ApiBody({ type: User })
//   register(@Body() user: User) {
//     return this.authService.createUser(user);
//   }

//   @Post('login')
//   @ApiOperation({ summary: 'Login user' })
//   @ApiBody({ type: User })
//   login(@Body() user: User) {
//     return this.authService.login(user);
//   }
// }

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
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
  register(@Body() dto: RegisterDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
