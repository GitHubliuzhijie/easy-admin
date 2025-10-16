import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
// system
import { SystemController } from './modules/system/system.controller';
import { SystemService } from './modules/system/system.service';

@Module({
  imports: [],
  controllers: [AppController, SystemController],
  providers: [AppService, SystemService],
})
export class AppModule {}
