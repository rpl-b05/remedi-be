import { HttpStatus } from '@nestjs/common';

export interface ResponseInterface {
  message?: string;
  responseCode?: HttpStatus;
  status?: 'SUCCESS' | 'FAILED';
}
