import {
  Controller, Post, Delete, Get, Param, Body, UploadedFile,
  UseGuards, UseInterceptors, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileCategory } from '../common/enums/file-type.enum';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/:applicationId')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Param('applicationId') applicationId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category: FileCategory,
  ) {
    return this.filesService.saveFile(applicationId, file, category);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const file = await this.filesService.findById(id);
    res.download(file.path, file.originalName);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
