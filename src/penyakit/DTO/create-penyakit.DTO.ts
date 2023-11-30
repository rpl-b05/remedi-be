import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePenyakitDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
