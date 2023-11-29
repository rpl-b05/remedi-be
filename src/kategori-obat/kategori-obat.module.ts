import { Module } from '@nestjs/common';
import { KategoriObatService } from './kategori-obat.service';
import { KategoriObatController } from './kategori-obat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KategoriObatController],
  providers: [KategoriObatService],
})
export class KategoriObatModule {}
