import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) { }
  async count() {
    return this.prisma.teacher.count()
  }
  async create(createTeacherDto: CreateTeacherDto) {
    const { mainDisciplines, additionalDisciplines, ...teacherData } = createTeacherDto;

    const teacher = await this.prisma.teacher.create({
      data: {
        ...teacherData,
        disciplines: {
          create: [
            ...(mainDisciplines || []).map((disciplineId) => ({
              discipline: { connect: { id: disciplineId } },
              isMain: true,
            })),
            ...(additionalDisciplines || []).map((disciplineId) => ({
              discipline: { connect: { id: disciplineId } },
              isMain: false,
            })),
          ],
        },
      },
      include: {
        disciplines: {
          include: {
            discipline: true,
          },
        },
      },
    });

    return this.TeacherSyn(teacher);
  }

  async findAll() {
    const teachers = await this.prisma.teacher.findMany({
      include: {
        disciplines: {
          include: {
            discipline: true
          }
        }
      },
      orderBy: [
        {department: 'desc'},
        {name: 'asc'}
      ]
    });
    return this.TeacherSyn(teachers);
  }

  async findOne(id: string) {
    const exist = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        disciplines: {
          include: {
            discipline: true,
          }
        }
      }
    });
    if (!exist) throw new NotFoundException("учителя с таким id не существует");
    return this.TeacherSyn(exist);
  }

  async update(id: string, dto: UpdateTeacherDto) {
    const exist = await this.findOne(id);
    if (!exist) throw new NotFoundException("учитель не найден");

    const { mainDisciplines, additionalDisciplines, ...updateData } = dto;

    const updatePayload: any = { ...updateData };

    if (mainDisciplines || additionalDisciplines) {
      await this.prisma.teacherDiscipline.deleteMany({
        where: { teacherId: id },
      });

      const allDisciplines = [
        ...(mainDisciplines || []).map((disciplineId) => ({
          teacherId: id,
          disciplineId,
          isMain: true,
        })),
        ...(additionalDisciplines || []).map((disciplineId) => ({
          teacherId: id,
          disciplineId,
          isMain: false,
        })),
      ];

      await this.prisma.teacherDiscipline.createMany({
        data: allDisciplines,
      });
    }

    const updated = await this.prisma.teacher.update({
      where: { id },
      data: updatePayload,
      include: {
        disciplines: {
          include: {
            discipline: true,
          },
        },
      },
    });

    return this.TeacherSyn(updated);
  }

  async remove(id: string) {
    const exist = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        disciplines: {
          include: {
            discipline: true,
          }
        }
      }
    });
    if (!exist) throw new NotFoundException("учителя с таким id не существует");
    return this.prisma.teacher.delete({
      where: { id }
    });
  }

  async TeacherSyn(teachers: any) {
    if (Array.isArray(teachers)) {
      return teachers.map(({ disciplines, ...teacher }) => ({
        ...teacher,
        mainDisciplines: disciplines
          .filter((td) => td.isMain)
          .map((td) => ({
            id: td.discipline.id,
            name: td.discipline.name,
          })),
        additionalDisciplines: disciplines
          .filter((td) => !td.isMain)
          .map((td) => ({
            id: td.discipline.id,
            name: td.discipline.name,
          })),
      }));
    }

    const { disciplines, ...teacher } = teachers;
    return {
      ...teacher,
      mainDisciplines: disciplines
        .filter((td) => td.isMain)
        .map((td) => ({
          id: td.discipline.id,
          name: td.discipline.name,
        })),
      additionalDisciplines: disciplines
        .filter((td) => !td.isMain)
        .map((td) => ({
          id: td.discipline.id,
          name: td.discipline.name,
        })),
    };
  }
}