import { IsEnum as IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly phone: number;

  @IsIn(["user", "admin"], {
    message: "Role must be either 'user' or 'admin'",
  })
  @IsOptional()
  readonly role: string;
}