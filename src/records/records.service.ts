import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMedicalRecordsbyUser(id:number, sorted: "desc" | "asc"){
    const data = await this.prisma.medicalRecord.findMany({
      orderBy:[{
          createdAt:sorted,
        }],
      where:{
        pasienId:id
      }
    })
    return data
  }
}


