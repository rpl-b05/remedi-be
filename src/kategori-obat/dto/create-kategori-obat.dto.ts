import { IsString } from 'class-validator';

export class CreateKategoriObatDto {
  @IsString()
  name: string;
}
