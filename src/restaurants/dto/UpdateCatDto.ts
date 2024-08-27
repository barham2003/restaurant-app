import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './CreateRestaurantDto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
