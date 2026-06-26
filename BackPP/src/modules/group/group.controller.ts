import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { IdParamDto } from '../../common/dto/id-param.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupService.create(dto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }
  @Get('/count')
  count() {
    return this.groupService.count();
  }

  @Get(':id')
  findOne(@Param() id: IdParamDto) {
    return this.groupService.findOne(id.id);
  }

  @Patch(':id')
  update(@Param() id: IdParamDto, @Body() dto: UpdateGroupDto) {
    return this.groupService.update(id.id, dto);
  }

  @Delete(':id')
  remove(@Param() id: IdParamDto) {
    return this.groupService.remove(id.id);
  }

}
