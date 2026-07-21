import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, ArrayUnique, ArrayNotEmpty, IsMongoId } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Product Team', description: 'Name of the team' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Cross-functional product team', description: 'Description of the team' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: ['684efb1f4db4d8f5e98b1234'], description: 'List of team member IDs' })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  members?: string[];

  @ApiPropertyOptional({ example: '684efb1f4db4d8f5e98b1234', description: 'Team leader user ID' })
  @IsMongoId()
  @IsOptional()
  leader?: string;
}
