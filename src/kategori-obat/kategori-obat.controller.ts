import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { KategoriObatService } from './kategori-obat.service';
import { CreateKategoriObatDto } from './dto/create-kategori-obat.dto';
import { ResponseUtil } from 'src/common/utils/response.util';
import { allowedRole } from 'src/common/decorators/allowedRole.decorator';
import { Role } from '@prisma/client';

@Controller('kategori-obat')
export class KategoriObatController {
  constructor(
    private readonly kategoriObatService: KategoriObatService,
    private readonly responseUtil: ResponseUtil,
  ) {}

  @allowedRole(Role.DOCTOR)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createKategoriObatDto: CreateKategoriObatDto) {
    const data = await this.kategoriObatService.create(createKategoriObatDto);

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        message: 'Data created successfully',
      },
      { data },
    );
  }

  @allowedRole(Role.DOCTOR)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('name') name: string) {
    const listKategoriObat = await this.kategoriObatService.findAll(name);

    return this.responseUtil.response({}, { listKategoriObat });
  }
}
