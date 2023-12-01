import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class UpdateMedicalRecordDTO {
    @IsString()
    description: string;
    
    @IsNumber()
    @IsNotEmpty()
    penyakitId: number;

    @ValidateNested({ each: true })
    @Type(() => RecordObat)
    daftarRecordObat: RecordObat[];
}

class RecordObat {
    @IsNumber()
    @IsNotEmpty()
    obatId: number;

    @IsString()
    @IsNotEmpty()
    dosis: string;
}