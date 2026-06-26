import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(dto: CreateGroupDto) {
    const exist = await this.prisma.group.findFirst({
      where: {
        name: dto.name,
      }
    });
    if (exist) throw new ConflictException("дисциплина с таким названием уже существуеь")
    return this.prisma.group.create({
      data: {
        name: dto.name,
        department: dto.department,
        shift: dto.shift
      }
    })
  }

  async findAll() {
    return this.prisma.group.findMany({
      orderBy: [
        {department: 'desc'},
        {name: 'asc'}
      ]
    })
  }

  async findOne(id: string) {
    const exist = await this.prisma.group.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return exist
  }

  async update(id: string, dto: UpdateGroupDto) {
    const exist = await this.prisma.group.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return this.prisma.group.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: string) {
    const exist = await this.prisma.group.findFirst({
      where: { id }
    });
    if (!exist) throw new ConflictException("дисциплины с таким названием не существует")
    return this.prisma.group.delete({
      where: { id }
    })
  }

  async count() {
    return this.prisma.group.count()
  }

  private sanitizeDescipline(data: any) {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
