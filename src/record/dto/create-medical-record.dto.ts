import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalRecordDTO{
    @IsString()
    @IsNotEmpty()
    pasienEmail: string
}