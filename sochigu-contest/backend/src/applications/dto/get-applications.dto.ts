import { IsOptional, IsEnum, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '../../common/enums/application-status.enum';

export class GetApplicationsDto {
  @IsOptional()
  @IsUUID()
  nominationId?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  university?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
