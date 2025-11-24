import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  Rol: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  Password: string;
}
