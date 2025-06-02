import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Transform, Type, Expose } from 'class-transformer';
import { LoginRequestDto } from './auth.dto';

export class RequiredDocumentDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  url?: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) =>
    value ? value.toISOString().split('T')[0] : undefined
  )
  expirationDate?: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  notApplicable?: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  _id?: string; // Solo si necesitas identificar el documento individualmente
}

export class UserRequestDto extends LoginRequestDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsInt()
  age: number;

  @Expose()
  @IsString()
  rut: string;

  @Expose()
  @IsString()
  address: string;

  @Expose()
  @IsString()
  phone: string;

  @Expose()
  @IsString()
  area: string;

  @Expose()
  @IsString()
  position: string;

  @Expose()
  @IsString()
  role: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  birthdate: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value?.toISOString().split('T')[0])
  date_incorporation: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequiredDocumentDto)
  requiredDocuments: RequiredDocumentDto[];
}
