import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CheckPointsService } from './check-points.service';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('check-points')
@Controller('check-points')
export class CheckPointsController {
  constructor(private readonly checkPointsService: CheckPointsService) {}

  @Post()
  create(@Body() createCheckPointDto: CreateCheckPointDto) {
    return this.checkPointsService.create(createCheckPointDto);
  }

  @Get()
  findAll() {
    return this.checkPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkPointsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkPointsService.remove(id);
  }
}
