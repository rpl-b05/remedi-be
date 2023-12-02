import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyMedicalRecordDto } from './dto/verify-medical-record.dto';
import { UpdateMedicalRecordDTO } from './dto/update-medical-record-dto';
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

  async getAllPasienWithMedRecs(query: string){
    const listAllPasienId = await this.prisma.medicalRecord.findMany({
      where: {},
      distinct: ['pasienId'],
      select: {
        pasienId: true
      }
    })

    const listAllPasienEmail = []
    for (let { pasienId } of listAllPasienId){
      const user = await this.prisma.user.findUnique({
        where: {
          id: pasienId
        }
      })
      const email = user?.email
      listAllPasienEmail.push(email)
    }

    if (query == ""){
      return listAllPasienEmail
    } else {
      const resultFiltered = []
      for (let email of listAllPasienEmail){
        if (email?.startsWith(query)) {
          resultFiltered.push(email)
        }
      }
      return resultFiltered
    }
  }
  
  async getPasienByEmail(email: string) {
    const pasien = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (!pasien) throw new NotFoundException("Pasien tidak ditemukan")
    return pasien
  }

  async getPasienMedicalRecords(email: string){
    const pasien = await this.getPasienByEmail(email)
    const isExist = await this.isPasienWithMedicalRecordsExist(email)
    if (!isExist){
      throw new NotFoundException("Pasien belum punya medical record")
    }
    const pasienId = pasien.id
    const records = await this.prisma.medicalRecord.findMany({
      where: {
        pasienId: pasienId
      },
      include: {
        recordObat: true
      }
    })
    return records
  }

  async isPasienWithMedicalRecordsExist(email: string) {
    const listAllPasienEmail = await this.getAllPasienWithMedRecs("")
    return listAllPasienEmail.includes(email)
  }

  async createMedicalRecord(dokterId: number, pasienEmail: string) {
    const pasien = await this.getPasienByEmail(pasienEmail)
    const pasienId = pasien.id

    return await this.prisma.medicalRecord.create({
      data: {
        pasienId: pasienId,
        dokterId: dokterId
      }
    })
  }

  async updateMedicalRecord(recordId: number, updateDto: UpdateMedicalRecordDTO) {
    const { description, penyakitId, daftarRecordObat } = updateDto;
    
    const record = await this.prisma.medicalRecord.findUnique({
      where: {
        id: recordId
      }
    })

    if (!record) throw new NotFoundException("Record is not found")

    console.log(record.isVerified)
    if (!record.isVerified){
      throw new NotFoundException("You can't update record because it is not verified")
    } 

    await this.prisma.medicalRecord.update({
      where: {
        id: recordId
      },
      data: {
        description: description,
        penyakitId: penyakitId
      }
    })

    for (let recordObat of daftarRecordObat) {
      await this.prisma.recordObat.create({
        data: {
          recordId: recordId,
          obatId: recordObat.obatId,
          dosis: recordObat.dosis
        }
      })
    }

    return await this.prisma.medicalRecord.findUnique({
      where: {
        id: recordId
      },
      include: {
        recordObat: true
      }
    })
  }
}
