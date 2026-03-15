import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(1)
  message: string;
}
