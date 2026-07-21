import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This looks good. Can we add an extra test?' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ example: '684efb1f4db4d8f5e98b1234' })
  @IsMongoId()
  @IsOptional()
  parentComment?: string;
}
