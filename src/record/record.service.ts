import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyMedicalRecordDto } from './dto/verify-medical-record.dto';
@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {}

  async findMedicalRecordsbyUser(pasienId: number, sort?: 'desc' | 'asc') {
    if (sort && sort != 'desc' && sort != 'asc') {
      throw new BadRequestException('sort can only be desc or asc');
    }
    const data = await this.prisma.medicalRecord.findMany({
      orderBy: [
        {
          createdAt: sort || 'desc',
        },
      ],
      where: {
        pasienId,
      },
    });
    return data;
  }

  async verifyRecord(
    id: number,
    pasienId: number,
    verifyMedicalRecordDto: VerifyMedicalRecordDto,
  ) {
    const record = await this.prisma.medicalRecord.findFirst({
      where: {
        id,
      },
    });
    if (!record) {
      throw new NotFoundException('Record tidak ditemukan');
    }
    if (record.pasienId != pasienId) {
      throw new ForbiddenException('User tidak mempunyai akses');
    }
    return await this.prisma.medicalRecord.update({
      where: {
        id,
      },
      data: verifyMedicalRecordDto,
    });
  }
}
