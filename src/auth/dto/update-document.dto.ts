import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  name: string; // "GCP", "CV", etc.

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;
}
