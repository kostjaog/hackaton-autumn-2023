import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForkliftsService } from './forklifts.service';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { UpdateForkliftDto } from './dto/update-forklift.dto';

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
    return this.forkliftsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForkliftDto: UpdateForkliftDto) {
    return this.forkliftsService.update(+id, updateForkliftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forkliftsService.remove(+id);
  }
}
