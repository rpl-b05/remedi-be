import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatService } from './obat.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ObatController],
  providers: [ObatService, PrismaService],
})
export class ObatModule {}
