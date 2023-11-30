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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWR_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRY as string },
    }),
    CommonModule,
    ObatModule,
    KategoriObatModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
