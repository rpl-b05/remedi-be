import { IsOptional, IsString } from 'class-validator';

export class FindAllPenyakitQuery {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly category: string;
}
