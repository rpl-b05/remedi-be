import { Injectable, Logger } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ResponseInterface } from './response.interface';

@Injectable()
export class ResponseUtil {
  response({ responseCode, message, status }: ResponseInterface, data?: any) {
    const responsePayload = {
      responseMessage: message || 'Data retrieved successfully',
      responseCode: responseCode || HttpStatus.OK,
      responseStatus: status || 'SUCCESS',
      ...data,
    };

    Logger.log(responsePayload, `Response Body`);

    return responsePayload;
  }
}
