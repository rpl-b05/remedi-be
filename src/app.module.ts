import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ObatModule } from './obat/obat.module';
import { CommonModule } from './common/common.module';
import { KategoriObatModule } from './kategori-obat/kategori-obat.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: "remedisukses",
      signOptions: { expiresIn: '1h' },
    }),
    CommonModule,
    ObatModule,
    KategoriObatModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
