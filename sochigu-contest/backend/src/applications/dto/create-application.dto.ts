import { IsString, IsUUID, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  nominationId: string;

  @IsString()
  projectTitle: string;

  @IsString()
  projectDescription: string;

  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @IsArray()
  teamMembers?: {
    name: string;
    role: string;
    email?: string;
  }[];

  @IsOptional()
  @IsObject()
  supervisor?: {
    name: string;
    title: string;
    email?: string;
  };
}
