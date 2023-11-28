import { Injectable } from '@nestjs/common';

@Injectable()
export class ObatService {
  async getHello() {
    return 'helo';
  }
}
