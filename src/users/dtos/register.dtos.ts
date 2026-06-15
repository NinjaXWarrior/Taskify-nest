import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from './user.dto';

export class RegisterDto {
  @ApiProperty({ example: 'shiva@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'shiva' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Roles, example: Roles.USER })
  @IsEnum(Roles)
  role: Roles;
}
