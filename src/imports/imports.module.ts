import { Module } from '@nestjs/common';
import { ImportsService } from './service/imports.service';
import { ImportsController } from './controller/imports.controller';

@Module({
  providers: [ImportsService],
  controllers: [ImportsController]
})
export class ImportsModule {}
