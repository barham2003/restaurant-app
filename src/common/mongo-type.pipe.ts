
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from "mongoose"


@Injectable()
export class ParseObjId implements PipeTransform<any, Types.ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value)
    if (!validObjectId) throw new BadRequestException('Invalid ID')
    return Types.ObjectId.createFromHexString(value)

  }
}
