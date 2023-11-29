import { Controller, Get, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
    private responseUtil: ResponseUtil,
  ) {}

  @Get()
  async findMedicalRecordsbyUser(@Query('pasienId') pasienId:number, @Query('sort') sort:'asc'|'desc'){
    if (sort){
      sort='desc'
    }
    const MedicalRecords = await this.recordsService.findMedicalRecordsbyUser(pasienId, sort);
    return this.responseUtil.response({}, { MedicalRecords });
  }

  // @Get()
  // async hello() {
  //   const res = await this.recordsService.getHello();
  //   return this.responseUtil.response({ message: 'Medical Records' }, { data: res });
  // }
}