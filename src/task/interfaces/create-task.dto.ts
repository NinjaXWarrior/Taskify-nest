import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Learn NestJS',
    description: 'A short title for the task.',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Complete CRUD API with MongoDB',
    description: 'A clear description of the task to be completed.',
    minLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;
}
