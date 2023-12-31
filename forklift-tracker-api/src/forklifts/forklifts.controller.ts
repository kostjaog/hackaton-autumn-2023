import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ForkliftsService } from './forklifts.service';
import { CreateForkliftDto } from './dto/create-forklift.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('forklifts')
@Controller('forklifts')
export class ForkliftsController {
  constructor(private readonly forkliftsService: ForkliftsService) {}

  @Post()
  create(@Body() createForkliftDto: any) {
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

  @Get('/statistics/:id/:start_date/:end_date')
  getStatistics(
    @Param('id') id: string,
    @Param('start_date') start_date: Date,
    @Param('end_date') end_date: Date,
  ) {
    return this.forkliftsService.getStatistics(id, start_date, end_date);
  }

  @Get('/transfer/:forklift_id/:warehouse_id')
  transferForklift(
    @Param('forklift_id') forklift_id: string,
    @Param('warehouse_id') warehouse_id: string,
  ) {
    return this.forkliftsService.warehouseTransfer(forklift_id, warehouse_id);
  }
}
