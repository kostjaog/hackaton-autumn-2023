import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ForkliftStepsService } from './forklift-steps.service';
import { CreateForkliftStepDto } from './dto/create-forklift-step.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('forklift-steps')
@Controller('forklift-steps')
export class ForkliftStepsController {
  constructor(private readonly forkliftStepsService: ForkliftStepsService) {}

  @Post()
  create(@Body() createForkliftStepDto: CreateForkliftStepDto) {
    return this.forkliftStepsService.create(createForkliftStepDto);
  }

  @Get()
  findAll() {
    return this.forkliftStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forkliftStepsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forkliftStepsService.remove(id);
  }
}
