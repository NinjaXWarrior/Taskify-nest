import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ArrayUnique,
} from 'class-validator';
import { TaskPriority } from './task-priority.enum';
import { TaskStatus } from './task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement project dashboard' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Build and test the new dashboard endpoints' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, example: TaskPriority.MEDIUM })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: '2026-08-15T18:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({ example: '684efb1f4db4d8f5e98b1234' })
  @IsMongoId()
  @IsOptional()
  assignedTo?: string;

  @ApiPropertyOptional({ example: '684efb1f4db4d8f5e98b1234' })
  @IsMongoId()
  @IsOptional()
  project?: string;

  @ApiPropertyOptional({ example: ['backend', 'urgent'] })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  labels?: string[];

  @ApiPropertyOptional({ example: ['API', 'dashboard'] })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ example: 12 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  estimatedHours?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  actualHours?: number;
}
