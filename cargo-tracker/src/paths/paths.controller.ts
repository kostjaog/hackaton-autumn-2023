import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';

@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Post()
  create(@Body() createPathDto: CreatePathDto) {
    return this.pathsService.create(createPathDto);
  }

  @Get()
  findAll() {
    return this.pathsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePathDto: UpdatePathDto) {
    return this.pathsService.update(+id, updatePathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pathsService.remove(+id);
  }
}
