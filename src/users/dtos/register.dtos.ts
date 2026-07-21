import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Roles } from './user.dto';

export class RegisterDto {
  @ApiProperty({
    example: 'shiva@gmail.com',
    description: 'Unique email address for the account.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'shiva', description: 'Display name for the user.' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password must be at least 6 characters long.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: Roles,
    example: Roles.USER,
    description: 'Role assigned to the user.',
  })
  @IsEnum(Roles)
  role: Roles;
}
