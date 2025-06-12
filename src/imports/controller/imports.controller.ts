import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ImportsService } from '../service';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { AddSketchDto } from '../dto';
import { SketchResponse } from '../interface';

@Controller('imports')
export class ImportsController {

  constructor(
    private readonly importsService: ImportsService
  ){}


  @Post()
  @HttpCode(HttpStatus.OK)
  @FormDataRequest({storage: MemoryStoredFile})
  public async processSketchToHtml(
    @Body() addSketchDto: AddSketchDto
  ): Promise<SketchResponse>{
    return await this.importsService.processSketchToHtml(addSketchDto);
  }
}
