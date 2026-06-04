import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userInfo } from 'os';
import { DatabaseModule } from 'src/database/database.module';
import { UserSchema, UserSchemaName } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchemaName,
        schema: UserSchema,
      }
    ]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
