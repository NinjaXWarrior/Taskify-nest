import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { v4 as uuidv4 } from 'uuid';
import { RegisterDto } from '../users/dtos/register.dtos';
import { LoginDto } from '../users/dtos/login.dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async createUser(dto: RegisterDto): Promise<string> {
  //   const existingUser = await this.usersService.findByEmail(dto.email);

  //   if (existingUser) {
  //     throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
  //   }

  //   const newUser = {
  //     ...dto,
  //     // id: uuidv4(),
  //   };

  //   await this.usersService.addUser(newUser);

  //   return 'created User successfully';
  // }

  async createUser(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.addUser(dto);

    return {
      message: 'created User successfully',
      timestamp: new Date().toISOString(),
      user: {
        _id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
      },
    };
  }

  // async login(dto: LoginDto): Promise<{ accessToken: string }> {
  async login(dto: LoginDto): Promise<{
    message: string;
    accessToken: string;
    user: any;
    timestamp: string;
  }> {
    const result = await this.usersService.findByEmail(dto.email);

    if (result && result.password === dto.password) {
      const payload = {
        username: result.userName,
        id: result._id,
        roles: result.role,
        iss: 'Shiva',
      };
      return {
        message: 'Login successful',
        accessToken: this.jwtService.sign(payload),
        timestamp: new Date().toISOString(),
        user: {
          _id: result._id,
          email: result.email,
          userName: result.userName,
          role: result.role,
        },
      };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
