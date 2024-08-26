import { Test, TestingModule } from '@nestjs/testing';
import { OwnersController } from './users.controller';
import { UsersService } from './users.service';

describe('OwnersController', () => {
  let controller: OwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<OwnersController>(OwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
