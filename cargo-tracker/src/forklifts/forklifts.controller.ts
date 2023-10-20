import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ForkliftsService } from './forklifts.service';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('forklifts')
@Controller('forklifts')
export class ForkliftsController {
  constructor(private readonly forkliftsService: ForkliftsService) {}

  @Post()
  create(@Body() createForkliftDto: CreateForkliftDto) {
    return this.forkliftsService.create(createForkliftDto);
  }

  @Get()
  findAll() {
    return this.forkliftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forkliftsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forkliftsService.remove(id);
  }
}
