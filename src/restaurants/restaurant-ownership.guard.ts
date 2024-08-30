import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/public-route.pipe';
import { Role } from 'src/roles/roles.enum';
import { RestaurantsService } from './restaurants.service';

@Injectable()
export class RestaurantOwnerShip implements CanActivate {
  constructor(
    private reflector: Reflector,
    private restaurantService: RestaurantsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const user = req.user;
    if (!user) return false;

    if (user.role === Role.Admin) return true;

    const restaurantId = req.params.id;

    if (restaurantId) {
      const restaurant = await this.restaurantService.findOne(restaurantId);
      if (!restaurant) throw new NotFoundException('restaurant not found');
      const owner = restaurant.user;
      if (user._id.toString() !== owner._id.toString()) return false;
    } else {
      return false;
    }

    return true;
  }
}
