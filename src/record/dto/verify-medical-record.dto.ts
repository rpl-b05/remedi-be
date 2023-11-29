import { IsBoolean } from 'class-validator';

export class VerifyMedicalRecordDto {
  @IsBoolean()
  isVerified: boolean;
}
