import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './modules/prisma/prisma.module';
import { envConfig } from './common/config/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DisciplinesModule } from './modules/disciplines/disciplines.module';
import { GroupModule } from './modules/group/group.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { PairsModule } from './modules/pairs/pairs.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { BlobModule } from './modules/blob/blob.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envConfig.validationSchema,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDir = configService.get<string>('UPLOAD_DIR') || 'uploads';
        const absolutePath = path.join(process.cwd(), uploadDir);

        return [
          {
            rootPath: absolutePath,
            serveRoot: '/uploads',
            serveStaticOptions: { index: false },
          },
        ];
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DisciplinesModule,
    GroupModule,
    TeacherModule,
    PairsModule,
    SchedulesModule,
    BlobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
