import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatService } from './obat.service';

@Module({
  controllers: [ObatController],
  providers: [ObatService],
})
export class ObatModule {}
