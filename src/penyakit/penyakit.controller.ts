import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PenyakitService } from './penyakit.service';
import { FindAllPenyakitQuery } from './DTO/find-all-penyakit-query.DTO';
import { ResponseUtil } from 'src/common/utils/response.util';
import { CreatePenyakitDTO } from './DTO/create-penyakit.DTO';

@Controller('penyakit')
export class PenyakitController {
  constructor(
    private readonly penyakitService: PenyakitService,
    private readonly responseUtil: ResponseUtil,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: FindAllPenyakitQuery) {
    const allPenyakit = await this.penyakitService.findAll(query);
    return this.responseUtil.response({}, { data: allPenyakit });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePenyakitDTO) {
    const data = await this.penyakitService.create(body);
    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        message: 'Data successfully created',
      },
      { data },
    );
  }
}
