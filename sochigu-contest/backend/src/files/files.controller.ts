import {
  Controller, Post, Delete, Get, Param, Body, UploadedFile,
  UseGuards, UseInterceptors, Res, ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileCategory } from '../common/enums/file-type.enum';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/:applicationId')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Param('applicationId') applicationId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category: FileCategory,
    @CurrentUser() user: any,
  ) {
    if (user.role === 'participant') {
      const app = await this.filesService.findApplicationById(applicationId);
      if (!app || app.userId !== user.id) throw new ForbiddenException();
    }
    return this.filesService.saveFile(applicationId, file, category);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response, @CurrentUser() user: any) {
    const file = await this.filesService.findById(id);
    if (user.role === 'participant' && file.application?.userId !== user.id) {
      throw new ForbiddenException();
    }
    res.download(file.path, file.originalName);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const file = await this.filesService.findById(id);
    if (user.role === 'participant' && file.application?.userId !== user.id) {
      throw new ForbiddenException();
    }
    return this.filesService.remove(id);
  }
}
