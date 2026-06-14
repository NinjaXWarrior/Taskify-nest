import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RegisterDto } from '../users/dtos/register.dtos';
import { LoginDto } from '../users/dtos/login.dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: RegisterDto): Promise<string> {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    }

    const newUser = {
      ...dto,
      id: uuidv4(),
    };

    this.usersService.addUser(newUser);

    return 'created User successfully';
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const result = await this.usersService.findByEmail(dto.email);

    if (result && result.password === dto.password) {
      const payload = {
        username: result.userName,
        id: result.id,
        roles: result.role,
        iss: 'Hitesh',
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
