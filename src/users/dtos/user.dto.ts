import { IsString, IsNotEmpty } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly role: Roles;

  @IsString()
  @IsNotEmpty()
  public id: string;
}

export enum Roles {
  ADMIN,
  USER,
}
