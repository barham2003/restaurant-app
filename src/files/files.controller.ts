import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { StreamFile } from 'src/common/file-check.pipe';
import { Public } from 'src/common/public-route.pipe';

@Controller('files')
export class FilesController {
  @Get(':name')
  @Public()
  @StreamFile()
  async getFile(@Param('name') name: string) {
    const dirname = process.cwd();
    const fileDir = join(dirname, 'files-dir', name);
    try {
      const file = createReadStream(fileDir);
      return new StreamableFile(file, {
        type: 'image/png',
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException('File not found');
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files-dir',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const name = `${uniqueSuffix}.${file.originalname.split('.').at(-1)}`;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new NotFoundException('File upload failed');
    }

    const domain = process.env.DOMAIN;

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      url: `${domain}/files/${file.filename}`, // Adjust this to your actual URL structure
    };
  }
}
