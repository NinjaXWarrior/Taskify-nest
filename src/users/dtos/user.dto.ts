import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  @ApiProperty({
    example: 'shiva@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'shiva',
  })
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({
    enum: Roles,
    example: Roles.USER,
  })
  @IsNotEmpty()
  readonly role: Roles;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
