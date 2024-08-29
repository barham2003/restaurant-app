import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjId implements PipeTransform<any, string> {
  transform(value: any): string {
    const validObjectId = Types.ObjectId.isValid(value);
    if (!validObjectId) throw new BadRequestException('Invalid ID');
    return value;
  }
}
