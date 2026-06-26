import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FilterScheduleDto } from './dto/filter-schedule.dto';
import { GenerateScheduleDto } from './dto/generate-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll(@Query() query: FilterScheduleDto) {
    return this.schedulesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }

  @Post('generate')
  generate(@Body() dto: GenerateScheduleDto) {
    return this.schedulesService.generate(dto);
  }

  @Delete('day/:groupId/:date')
  removeDay(
    @Param('groupId') groupId: string,
    @Param('date') date: string,
  ) {
    return this.schedulesService.deleteGroupSchedule(groupId, date);
  }
}