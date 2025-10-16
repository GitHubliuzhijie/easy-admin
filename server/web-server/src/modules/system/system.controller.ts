import { Controller, Get, Post } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/login')
  login(): string {
    return this.systemService.login();
  }
  @Post('/login')
  loginPost(): string {
    return this.systemService.login();
  }
}
