import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortChoice {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetMedicalRecordDto {
  @IsNumber()
  @IsOptional()
  pasienId: number;

  @IsEnum(SortChoice)
  @IsOptional()
  sort: SortChoice;
}
