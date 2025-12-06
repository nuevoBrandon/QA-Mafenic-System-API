import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  Rol: string;

  @IsString()
  @IsOptional()
  Active?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  Password: string;
}
