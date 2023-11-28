import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  async findAll(@Query('name') name: string) {
    const res = await this.obatService.findAll(name);
    return this.responseUtil.response(
      { message: 'Obat successfully retrieved' },
      { data: res },
    );
  }

  @Get()
  async findAllByCategory(@Query('category') category: string) {
    const res = await this.obatService.findAllByCategory(category);
    return this.responseUtil.response(
      { message: 'Obat successfully retrieved' },
      { data: res },
    );
  }

  @Post()
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
