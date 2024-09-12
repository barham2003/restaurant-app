import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { Public } from 'src/common/public-route.pipe';

@Controller('file')
export class FileController {
  @Get(':name')
  @Public()
  getFile(@Res() res: Response, @Param('name') name: string) {
    const dirname = process.cwd();
    const file = `${dirname}/images/${name}`;
    try {
      const fileStream = createReadStream(file);
      return new StreamableFile(fileStream);
    } catch (e) {
      console.log(e);
      throw new NotFoundException();
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const name = `${uniqueSuffix}.${file.originalname.split('.').at(-1)}`;
          cb(null, name);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File upload failed');
    }

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
      url: `localhost:3000/uploads/${file.filename}`, // Adjust this to your actual URL structure
    };
  }
}
