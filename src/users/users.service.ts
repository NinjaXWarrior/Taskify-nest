import { Injectable } from '@nestjs/common';
import { user } from './interface/user.interface';
import { Model } from 'mongoose';
import { User } from './dtos/user.dto'
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaName } from './schemas/user.schema';

@Injectable()
export class UsersService {


  constructor(@InjectModel(UserSchemaName) private readonly usersModel: Model<user>){}

  // private users: User[] = [];

  findOne(user: User) {
    // return this.users.find((users) => users.email === user.email);
    return this.usersModel.findById(user.id)
  }

  addUser(user: User) {
    try {
      this.usersModel.updateOne(user);
      // this.users.push(user);
      // console.log('all users', this.users);
    } catch (err) {
      console.log(err);
    }
  }
}
