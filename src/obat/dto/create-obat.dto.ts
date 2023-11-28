import { IsNotEmpty, IsString } from 'class-validator';

export class CreateObatDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
