import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hashString } from "../../common/utils/hash.util";
import { Prisma } from '../../generated/prisma/client';
import { BlobService } from '../blob/blob.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async findAll() {
    const users = await this.prismaService.user.findMany({
      orderBy: [
        { role: 'asc' },
        { createdAt: 'asc' }
      ]
    });

    return users.map((user) => this.sanitizeUser(user));
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return this.sanitizeUser(user);
  }

  async create(dto: CreateUserDto, file?: Express.Multer.File) {
    const exists = await this.prismaService.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Пользователь с таким email уже существует');

    const hashedPassword = await hashString(dto.password);

    // Загружаем файл в Vercel Blob (если есть)
    let avatarUrl: string | null = null;
    if (file) {
      avatarUrl = await this.blobService.uploadFile(file, 'avatars');
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        avatar: avatarUrl, // Сохраняем полный URL в БД
      },
    });

    return this.sanitizeUser(user);
  }

  async update(id: string, dto: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    // Если загружается новый файл — удаляем старый из Blob
    let avatarUrl: string | undefined = undefined;
    if (file) {
      if (user.avatar) {
        await this.blobService.deleteFile(user.avatar);
      }
      avatarUrl = await this.blobService.uploadFile(file, 'avatars');
    }

    const data: Prisma.UserUpdateInput = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      avatar: avatarUrl, // Обновляем URL (или undefined, если файл не менялся)
      password: dto.password ? await hashString(dto.password) : undefined,
    };

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data,
    });

    return this.sanitizeUser(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Пользователь не найден');

    // Удаляем аватар из Blob, если он есть
    if (user.avatar) {
      await this.blobService.deleteFile(user.avatar);
    }

    return this.prismaService.user.delete({ where: { id } });
  }

  private sanitizeUser(user: any) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar || null, // URL уже полный — просто возвращаем
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}