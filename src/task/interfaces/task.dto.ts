import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Task {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  createdOn: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
