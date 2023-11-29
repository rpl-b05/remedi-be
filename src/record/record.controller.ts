import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { VerifyMedicalRecordDto } from './dto/verify-medical-record.dto';

@Controller('record')
export class RecordController {
  constructor(
    private readonly recordService: RecordService,
    private responseUtil: ResponseUtil,
  ) {}

  @Get()
  async findByUser(
    @Query('pasienId', ParseIntPipe) pasienId: number,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    const medicalRecords = await this.recordService.findMedicalRecordsbyUser(
      pasienId,
      sort,
    );
    return this.responseUtil.response({}, { medicalRecords });
  }

  @Patch('/:id')
  // TODO :
  // @UseGuards()
  async verify(
    @Param('id', ParseIntPipe) id: number,
    @Body() verifyMedicalRecordDto: VerifyMedicalRecordDto,
    @Req() request: any,
  ) {
    const medicalRecord = this.recordService.verifyRecord(
      id,
      request.user.id,
      verifyMedicalRecordDto,
    );
    return this.responseUtil.response(
      {
        message: 'Medical Record sudah diupdate.',
      },
      { medicalRecord },
    );
  }
  // @Get()
  // async hello() {
  //   const res = await this.recordsService.getHello();
  //   return this.responseUtil.response({ message: 'Medical Records' }, { data: res });
  // }
}
