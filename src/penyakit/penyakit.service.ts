import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePenyakitDTO } from './DTO/create-penyakit.DTO';
import { Penyakit } from '@prisma/client';
import { FindAllPenyakitQuery } from './DTO/find-all-penyakit-query.DTO';

@Injectable()
export class PenyakitService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePenyakitDTO): Promise<Penyakit> {
    const { name } = body;

    const penyakit = await this.prisma.penyakit.findFirst({
      where: {
        name,
      },
    });

    if (!!penyakit && penyakit.name.toLowerCase() === name.toLowerCase()) {
      throw new ConflictException('Data already exist');
    }

    return await this.prisma.penyakit.create({
      data: body,
    });
  }

  async findAll(query: FindAllPenyakitQuery) {
    const { name, category } = query;
    const data = await this.prisma.penyakit.findMany({
      where: {
        ...(!!name && name !== '' && {name: {
          contains: name,
          mode: 'insensitive',
        }}),
        ...(!!category && category !== '' && {category: {
          contains: category,
          mode: 'insensitive',
        }}),
      },
    });

    return data;
  }
}
