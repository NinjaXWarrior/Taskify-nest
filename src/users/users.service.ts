import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/user.dto';
import { UserSchemaName } from './schemas/user.schema';
import { RegisterDto } from './dtos/register.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly usersModel: Model<User>,
  ) {}

  async addUser(user: RegisterDto) {
    const newUser = new this.usersModel(user);
    // console.log('UserService:', user);
    return await newUser.save();
  }

  async findByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.usersModel.findById(id);
  }
}
