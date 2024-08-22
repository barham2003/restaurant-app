import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resturant } from 'src/schemas/resturant.schema';
import { Model } from 'mongoose';

@Injectable()
export class ResturantsService {
  constructor(@InjectModel(Resturant.name) private resturantModel: Model<Resturant>) { }

  getAll() {
    return this.resturantModel.find()
  }


  async getOne(id: string) {
    const resturant = await this.resturantModel.findById(id)
    if (resturant === undefined || !resturant) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    return resturant
  }

  async create(body: Resturant) {
    return await this.resturantModel.create(body)
  }

  async delete(id: string) {
    const result = await this.resturantModel.findByIdAndDelete(id)
    return result
  }

  async edit(id: string, body: Resturant) {
    const data = await this.resturantModel.findByIdAndUpdate(id, body)
    if (!data) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
    return { message: "Successfully Updated", statusCode: HttpStatus.OK }
  }
}

