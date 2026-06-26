import { Injectable } from '@nestjs/common';
import { put, del, list } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class BlobService {
    /**
     * Загрузить файл в Vercel Blob
     */
    // blob.service.ts
    async uploadFile(file: Express.Multer.File, folder = 'photos'): Promise<string> {
        const ext = extname(file.originalname).toLowerCase();
        const filename = `${folder}/${uuidv4()}${ext}`;

        console.log('📤 Загружаю файл:', filename);

        const blob = await put(filename, file.buffer, {
            access: 'public',  // ✅ Это правильно
            contentType: file.mimetype,
            addRandomSuffix: false,
            // ❌ УБРАТЬ: allowDownload: true - такого свойства нет!
        });

        console.log('✅ Файл загружен:', blob.url);
        console.log('📋 Метаданные:', {
            pathname: blob.pathname,
            url: blob.url,
        });

        // Возвращаем URL
        return blob.url;
    }
    /**
     * Удалить файл из Vercel Blob
     */
    async deleteFile(url: string): Promise<void> {
        await del(url);
    }

    /**
     * Получить список файлов в папке
     */
    async listFiles(prefix: string) {
        const { blobs } = await list({ prefix });
        return blobs;
    }
}