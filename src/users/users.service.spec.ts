import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('checkAPIKey should be false when the key does exist', () => {

    return service.checkAPIKey("teste").then((result) => {
      expect(result).toBeFalsy();
    })

  });


  it('checkAPIKey should be true when the key exists', () => {

    return service.checkAPIKey("key1").then((result) => {
      expect(result).toBeTruthy();
    })

  });

});
