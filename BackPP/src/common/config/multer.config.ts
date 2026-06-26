import { BadRequestException, Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { memoryStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMulterOptions(): MulterModuleOptions {
        const maxSize = this.configService.get<number>('UPLOAD_MAX_SIZE') || 4 * 1024 * 1024;
        const allowedMimeTypes = this.configService.get<string>('UPLOAD_ALLOWED_MIME_TYPES')?.split(',') || ['image/jpeg', 'image/png'];

        return {
            limits: {
                fileSize: maxSize,
            },
            fileFilter: (req, file, cb) => {
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return cb(
                        new BadRequestException(`Недопустимый формат файла. Разрешены: ${allowedMimeTypes.join(', ')}`),
                        false,
                    );
                }
                cb(null, true);
            },
            storage: memoryStorage(),
        };
    }
}