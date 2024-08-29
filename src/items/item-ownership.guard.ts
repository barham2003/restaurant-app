import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/public-route.pipe';
import { Role } from 'src/roles/roles.enum';

@Injectable()
export class UserItemOwnerShip implements CanActivate {
  constructor(
    private itemService: ItemsService,
    private restaurantService: RestaurantsService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const user = request.user;
    if (!isPublic && !user) return false;

    if (user.role === Role.Admin) return true;

    const itemId = request.params.id;
    if (itemId) {
      const item = await this.itemService.findOne(itemId);
      if (!item) throw new NotFoundException('item not found');

      //@ts-expect-error doesn't count user
      if (item.restaurant.user === user.id) return true;
      else return false;
    }

    const restaurantId = request.body.restaurantId;
    if (restaurantId) {
      const restaurant = await this.restaurantService.findOne(restaurantId);
      if (!restaurant) throw new NotFoundException('restaurant not found');

      if (restaurant.user._id.toString() === user._id.toString()) return true;
      else return false;
    }

    return false;
  }
}
