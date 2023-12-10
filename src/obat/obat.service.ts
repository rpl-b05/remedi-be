import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateObatDto } from './dto/create-obat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ObatService {
  constructor(private prisma: PrismaService) {}
  async findAll(name: string) {
    const obat = await this.prisma.obat.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        kategori: true,
      },
    });
    return obat;
  }

  async findAllByCategory(category: string) {
    const kategoriObat = await this.prisma.kategoriObat.findFirst({
      where: {
        name: {
          contains: category,
          mode: 'insensitive',
        },
      },
    });

    if (kategoriObat == null) {
      return [];
    }
    const obat = await this.prisma.obat.findMany({
      where: {
        kategoriObatId: kategoriObat?.id,
      },
      select: {
        id: true,
        name: true,
        kategori: true,
      },
    });
    return obat;
  }

  async createObat(req: CreateObatDto) {
    const { name, category } = req;
    const kategoriObat = await this.prisma.kategoriObat.findFirst({
      where: {
        name: {
          equals: category,
          mode: 'insensitive',
        },
      },
    });
    if (!kategoriObat) throw new BadRequestException('Category Obat not found');
    try {
      const obat = await this.prisma.obat.create({
        data: {
          name,
          kategoriObatId: kategoriObat.id,
        },
      });

      const data = {
        name: obat.name,
        kategori_obat: kategoriObat,
      };
      return data;
    } catch (error) {
      throw new BadRequestException('Category Obat was assigned in other obat');
    }
  }
}
