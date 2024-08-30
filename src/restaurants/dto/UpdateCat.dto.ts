import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './CreateRestaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
