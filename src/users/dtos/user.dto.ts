import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TEAM_LEAD = 'TEAM_LEAD',
  EMPLOYEE = 'EMPLOYEE',
  USER = 'USER',
}

export class User {
  @ApiProperty({ example: 'shiva@gmail.com', description: 'Email address for the account.' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'password123', description: 'Hashed or plain password value.' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'shiva', description: 'Display name of the account owner.' })
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ enum: Roles, example: Roles.USER, description: 'Role assigned to the user.' })
  @IsNotEmpty()
  readonly role: Roles;

  @ApiProperty({ required: false })
  readonly avatar?: string;

  @ApiProperty({ required: false })
  readonly isActive?: boolean;

  @ApiProperty({ example: '688b2b7da6f3f4dd7d2e2a9b', description: 'Unique identifier for the user.' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
