import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatService } from './obat.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ObatController],
  providers: [ObatService],
  imports: [PrismaModule],
})
export class ObatModule {}
