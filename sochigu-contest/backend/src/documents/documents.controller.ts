import { Controller, Get, Post, Patch, Delete, Body, Param, Res, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

const UPLOAD_DIR = resolve('./uploads/docs');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findPublished();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllAdmin() {
    return this.documentsService.findAll();
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: UPLOAD_DIR,
      filename: (_, f, cb) => {
        const originalName = Buffer.from(f.originalname, 'latin1').toString('utf8');
        cb(null, `${uuid()}${extname(originalName)}`);
      },
    }),
  }))
  uploadDocument(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    if (!file) throw new BadRequestException('Файл не был загружен');
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    return this.documentsService.create({
      title: body.title,
      fileName: originalName,
      storagePath: file.path,
      mimeType: file.mimetype,
      size: file.size,
      category: body.category,
      isPublished: body.isPublished === 'true',
    });
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const doc = await this.documentsService.findOne(id);
    res.download(doc.storagePath, doc.fileName);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() body: any) {
    return this.documentsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
