import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { resolve } from 'path';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { WinnersService } from './winners.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

const PHOTO_DIR = resolve('./uploads/winners');
fs.mkdirSync(PHOTO_DIR, { recursive: true });

@Controller('winners')
export class WinnersController {
  constructor(private winnersService: WinnersService) {}

  @Get()
  findAll(@Query('year') year?: number, @Query('nominationId') nominationId?: string) {
    return this.winnersService.findAll({ year: year ? +year : undefined, nominationId });
  }

  @Get('years')
  getYears() {
    return this.winnersService.getYears();
  }

  @Post('upload-photo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Файл не получен');

    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
    const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif'];
    const ext = (file.originalname.split('.').pop() ?? '').toLowerCase();
    if (!allowedMimes.includes(file.mimetype) && !allowedExts.includes(ext)) {
      throw new BadRequestException('Разрешены только изображения (JPEG, PNG, GIF, WebP, HEIC)');
    }

    let buffer = file.buffer;
    let filename: string;

    if (file.mimetype === 'image/heic' || file.mimetype === 'image/heif' || ext === 'heic' || ext === 'heif') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const convert = require('heic-convert');
      const converted = await convert({ buffer: file.buffer, format: 'JPEG', quality: 0.9 });
      buffer = Buffer.from(converted);
      filename = `${uuid()}.jpg`;
    } else {
      const ext = file.originalname.split('.').pop()?.toLowerCase() || 'jpg';
      filename = `${uuid()}.${ext}`;
    }

    fs.writeFileSync(resolve(PHOTO_DIR, filename), buffer);
    return { url: `/api/winners/photo/${filename}` };
  }

  @Get('photo/:filename')
  servePhoto(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(resolve(PHOTO_DIR, filename));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: any) {
    return this.winnersService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() body: any) {
    return this.winnersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.winnersService.remove(id);
  }
}
