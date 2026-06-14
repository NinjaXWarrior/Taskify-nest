// import { Injectable } from '@nestjs/common';
// import { user } from './interface/user.interface';
// import { Model } from 'mongoose';
// import { User } from './dtos/user.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { UserSchemaName } from './schemas/user.schema';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(UserSchemaName) private readonly usersModel: Model<user>,
//   ) {}

//   // private users: User[] = [];

//   findOne(user: User) {
//     // return this.users.find((users) => users.email === user.email);
//     return this.usersModel.findById(user.id);
//   }

//   addUser(user: User) {
//     try {
//       this.usersModel.updateOne(user);
//       // this.users.push(user);
//       // console.log('all users', this.users);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   findByEmail(name: string) {
//     return this.usersModel.find((user) => user.name === name);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/user.dto';
import { UserSchemaName } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly usersModel: Model<User>,
  ) {}

  async addUser(user: User) {
    const newUser = new this.usersModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.usersModel.findById(id);
  }
}
