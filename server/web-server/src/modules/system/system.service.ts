import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  login(): string {
    return '启动成功 login!';
  }
}