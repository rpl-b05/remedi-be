import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsNumberString, IsOptional } from 'class-validator';
export enum SortChoice {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetMedicalRecordDto {
  @IsNumberString()
  @IsOptional()
  pasienId: string;

  @IsEnum(SortChoice)
  @IsOptional()
  sort: SortChoice;
}
