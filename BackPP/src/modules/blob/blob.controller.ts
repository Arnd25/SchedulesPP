import { BlobService } from './blob.service';
import { Controller, Post, Delete, Get, UseInterceptors, UploadedFile, Body, Param, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blob')
export class BlobController {
  constructor(private readonly blobService: BlobService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не передан');
    }

    const url = await this.blobService.uploadFile(file);
    return { url, originalName: file.originalname, size: file.size };
  }

  @Delete()
  async deleteFile(@Body('url') url: string) {
    if (!url) {
      throw new BadRequestException('URL файла не передан');
    }
    await this.blobService.deleteFile(url);
    return { success: true };
  }

  @Get('list')
  async listFiles(@Query('prefix') prefix = '') {
    const blobs = await this.blobService.listFiles(prefix);
    return { blobs };
  }
}