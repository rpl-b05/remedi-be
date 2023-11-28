import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateObatDto } from './dto/create-obat.dto';

@Injectable()
export class ObatService {
  constructor(private prisma: PrismaService) {}

  async findAll(name: string) {
    const obat = await this.prisma.obat.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return obat;
  }

  async findAllByCategory(category: string) {
    const kategoriObat = await this.prisma.kategoriObat.findFirst({
      where: {
        name: category,
      },
    });
    const obat = await this.prisma.obat.findMany({
      where: {
        kategoriObatId: kategoriObat?.id,
      },
    });
    return obat;
  }

  async createObat(req: CreateObatDto) {
    const { name, category } = req;
    const kategoriObat = await this.prisma.kategoriObat.findFirst({
      where: {
        name: category,
      },
    });
    if (!kategoriObat) throw new BadRequestException('Category Obat not found');

    const obat = await this.prisma.obat.create({
      data: {
        name,
        kategoriObatId: kategoriObat.id,
      },
    });
    return obat;
  }
}
