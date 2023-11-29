import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ObatService } from './obat.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { CreateObatDto } from './dto/create-obat.dto';

@Controller('obat')
export class ObatController {
  constructor(
    private readonly obatService: ObatService,
    private responseUtil: ResponseUtil,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('name') name: string) {
    const res = await this.obatService.findAll(name);
    return this.responseUtil.response(
      { message: 'Obat successfully retrieved' },
      { data: res },
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByCategory(@Query('category') category: string) {
    const res = await this.obatService.findAllByCategory(category);
    return this.responseUtil.response(
      { message: 'Obat successfully retrieved' },
      { data: res },
    );
  }

  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateObatDto) {
    const obat = await this.obatService.createObat(request);
    return this.responseUtil.response(
      {
        message: 'Obat successfully created',
      },
      { data: obat },
    );
  }
}
