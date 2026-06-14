import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'shiva@gmail.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
