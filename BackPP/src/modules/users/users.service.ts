import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashString } from "../../common/utils/hash.util";
import { getFileUrl } from "../../common/utils/url.util";
import { UpdateUserDto } from "./dto/update-user.dto";
import { deleteFileFromDisk } from "../../common/utils/delete-file.util";
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      orderBy: [
        { role: 'asc' },
        { createdAt: 'asc' }
      ]
    })

    return users.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return this.sanitizeUser(user);
  }

  async create(dto: CreateUserDto, file?: Express.Multer.File) {
    const exists = await this.prismaService.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Пользователь с таким email уже существует');

    const hashedPassword = await hashString(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        avatar: file ? file.filename : null,
      },
    });

    return this.sanitizeUser(user);
  }

  async update(id: string, dto: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    if (file && user.avatar) deleteFileFromDisk(user.avatar, this.configService);

    const data: Prisma.UserUpdateInput = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      avatar: file?.filename,
      password: dto.password ? await hashString(dto.password) : undefined,
    };

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: data,
    });

    return this.sanitizeUser(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    deleteFileFromDisk(user.avatar, this.configService);
    return this.prismaService.user.delete({ where: { id: id } });

  }

  private sanitizeUser(user: any) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: getFileUrl(user.avatar, this.configService),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
