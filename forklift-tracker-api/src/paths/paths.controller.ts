import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('paths')
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
    return this.pathsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pathsService.remove(id);
  }
}
