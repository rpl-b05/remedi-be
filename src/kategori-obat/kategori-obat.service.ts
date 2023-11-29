import { Injectable } from '@nestjs/common';
import { CreateKategoriObatDto } from './dto/create-kategori-obat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { KategoriObat } from '@prisma/client';

@Injectable()
export class KategoriObatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createKategoriObatDto: CreateKategoriObatDto,
  ): Promise<KategoriObat> {
    return await this.prisma.kategoriObat.create({
      data: createKategoriObatDto,
    });
  }

  async findAll(name: string) {
    const data = await this.prisma.kategoriObat.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return data;
  }
}
