import { Body, Controller, Post, Res, UploadedFile, UseGuards, UseInterceptors, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TokenPair } from '../../common/types/shared.type';
import { IMAGE_VALIDATION } from '../../common/constants/index.constant';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() dto: RegisterDto,
    @UploadedFile(IMAGE_VALIDATION) file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.register(dto, file);
    this.setCookies(res, tokens);
    return user;
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, tokens } = await this.authService.login(dto);
    this.setCookies(res, tokens);
    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser('userId') id: string, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(id);
    this.clearCookies(res);
    return { message: 'Успешный выход' };
  }

  private setCookies(res: Response, tokens: TokenPair) {
    const cookieOptions = {
      httpOnly: true,
      secure: this.configService.get<boolean>('COOKIE_SECURE'),
      domain: this.configService.get('COOKIE_DOMAIN') === 'localhost' ? undefined : this.configService.get('COOKIE_DOMAIN'),
      sameSite: this.configService.get('COOKIE_SAMESITE') as any,
      path: '/',
    };

    res.cookie('access_token', tokens.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 3600 * 1000,
      path: '/'
    });
  }

  private clearCookies(res: Response) {
    const domain = this.configService.get('COOKIE_DOMAIN') === 'localhost' ? undefined : this.configService.get('COOKIE_DOMAIN');
    res.clearCookie('access_token', { path: '/', domain });
    res.clearCookie('refresh_token', { path: '/', domain });
  }
}