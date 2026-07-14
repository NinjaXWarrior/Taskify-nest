import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Task {
  @ApiPropertyOptional({
    example: 1,
  })
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({
    example: 'Learn NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Complete CRUD using MongoDB',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: '2026-07-14T10:30:00.000Z',
  })
  @IsDate()
  @IsOptional()
  createdOn: Date;

  @ApiPropertyOptional({
    example: '6874ab1234567890abcdef12',
  })
  @IsString()
  @IsOptional()
  createdBy: string;
}
