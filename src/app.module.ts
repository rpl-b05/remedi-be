import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ObatModule } from './obat/obat.module';
import { CommonModule } from './common/common.module';
import { KategoriObatModule } from './kategori-obat/kategori-obat.module';
import { RecordModule } from './record/record.module';
import { PenyakitModule } from './penyakit/penyakit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule,
    ObatModule,
    KategoriObatModule,
    RecordModule,
    PenyakitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
