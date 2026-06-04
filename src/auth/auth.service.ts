import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/dtos/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(user: User): Promise<string> {
    console.log(this.usersService.findOne(user));
    if (this.usersService.findOne(user)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } else {
      user.id = uuidv4();
      this.usersService.addUser(user);
      return 'created User successfully';
    }
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const result = await this.usersService.findOne(user);

    if (result && result.password === user.password) {
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

    throw new HttpException('User no found', HttpStatus.NOT_FOUND);
  }
}
