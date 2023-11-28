import { Controller, Get } from '@nestjs/common';
import { ObatService } from './obat.service';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('obat')
export class ObatController {
  constructor(
    private readonly obatService: ObatService,
    private responseUtil: ResponseUtil,
  ) {}

  @Get()
  async hello() {
    const res = await this.obatService.getHello();
    return this.responseUtil.response({ message: 'Obat' }, { data: res });
  }
}
