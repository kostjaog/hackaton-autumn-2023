import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get('statistics/:name/:warehouse_id')
  getStatistics(
    @Param('name') name: string,
    @Param('warehouse_id') warehouse_id: string,
  ) {
    return this.sensorsService.getStatistics(name, warehouse_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sensorsService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sensorsService.remove(id);
  // }
}
