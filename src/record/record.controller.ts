import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { allowedRole } from 'src/common/decorators/allowedRole.decorator';
import { RecordService } from './record.service';
import { ResponseUtil } from 'src/common/utils/response.util';
import { VerifyMedicalRecordDto } from './dto/verify-medical-record.dto';
import { CreateMedicalRecordDTO } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDTO } from './dto/update-medical-record-dto';
import { Role } from '@prisma/client';
import { GetMedicalRecordDto } from './dto/get-medical-record.dto';

@Controller('record')
export class RecordController {
  constructor(
    private readonly recordService: RecordService,
    private responseUtil: ResponseUtil,
  ) {}

  @allowedRole(Role.DOCTOR)
  @allowedRole(Role.PATIENT)
  @Get('')
  async findByUser(@Query() query: GetMedicalRecordDto, @Req() request: any) {
    const { pasienId, sort } = query;
    const records = await this.recordService.findMedicalRecordsbyUser(
      request.user.id,
      pasienId,
      sort,
    );
    return this.responseUtil.response({}, { data: records });
  }

  @allowedRole(Role.PATIENT)
  @Patch('/:id')
  // TODO :
  // @UseGuards()
  async verify(
    @Param('id', ParseIntPipe) id: number,
    @Body() verifyMedicalRecordDto: VerifyMedicalRecordDto,
    @Req() request: any,
  ) {
    const record = this.recordService.verifyRecord(
      id,
      request.user.id,
      verifyMedicalRecordDto,
    );
    return this.responseUtil.response(
      {
        message: 'Medical Record sudah diupdate.',
      },
      { data: record },
    );
  }
  // @Get()
  // async hello() {
  //   const res = await this.recordsService.getHello();
  //   return this.responseUtil.response({ message: 'Medical Records' }, { data: res });
  // }

  @allowedRole(Role.DOCTOR)
  @Get('/all-pasien?')
  async getAllPasienWithMedRecs(@Query('email') email: string) {
    console.log(email);
    const result = await this.recordService.getAllPasienWithMedRecs(email);
    return this.responseUtil.response(
      { responseCode: HttpStatus.OK, message: 'success' },
      { result },
    );
  }

  @allowedRole(Role.DOCTOR)
  @Get('/pasien?')
  async getPasienMedicalRecords(@Query('email') email: string) {
    const medicalRecords = await this.recordService.getPasienMedicalRecords(
      email,
    );
    return this.responseUtil.response(
      { responseCode: HttpStatus.OK, message: 'success get med records' },
      { medicalRecords },
    );
  }

  @allowedRole(Role.DOCTOR)
  @Post()
  async createMedicalRecord(
    @Body() createRecordDto: CreateMedicalRecordDTO,
    @Req() request: any,
  ) {
    const doctor = request.user.id;
    const pasien = createRecordDto.pasienEmail;
    const record = await this.recordService.createMedicalRecord(doctor, pasien);
    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        message: 'Sukses membuat medical record baru',
      },
      { record },
    );
  }

  @allowedRole(Role.DOCTOR)
  @Patch('/update/:id')
  async updateMedicalRecord(
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDTO,
    @Param('id', ParseIntPipe) recordId: number,
  ) {
    const record = await this.recordService.updateMedicalRecord(
      recordId,
      updateMedicalRecordDto,
    );
    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        message: `Sukses mengedit medical record ${recordId}`,
      },
      { record },
    );
  }
}
