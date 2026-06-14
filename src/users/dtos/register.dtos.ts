import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './user.dto';

export class RegisterDto {
  @ApiProperty({ example: 'shiva@gmail.com' })
  email: string;

  @ApiProperty({ example: 'shiva' })
  userName: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ enum: Roles, example: Roles.USER })
  role: Roles;
}
