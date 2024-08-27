import { Test, TestingModule } from '@nestjs/testing';
import { usersController } from './users.controller';
import { UsersService } from './users.service';

describe('OwnersController', () => {
  let controller: usersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [usersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<usersController>(usersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
