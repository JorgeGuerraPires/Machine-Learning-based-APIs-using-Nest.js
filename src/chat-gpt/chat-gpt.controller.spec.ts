import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptController } from './chat-gpt.controller';
import { ChatGptService } from './chat-gpt.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { ApiKey } from '../custom-decorators/api-key.decorator';
import { UsersService } from '../users/users.service';


xdescribe('ChatGptController', () => {
  let controller: ChatGptController;

  let chatGPTService = {
    provide: ChatGptService,
    useValue: { chatGPTAPI: jest.fn().mockImplementation(() => "teste") }
  };


  let userService = {
    provide: UsersService,
    useValue: { chatGPTAPI: jest.fn().mockImplementation(() => "teste") }
  };



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGptController],
      providers: [chatGPTService, userService],
    })
      .overrideGuard(ApiKey)
      .useValue((data: string, req: any) => 'Mocked Value')
      .compile();

    controller = module.get<ChatGptController>(ChatGptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("Testing the controller", () => {

    it('should be a text as response', async () => {
      const res = {
        send: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;

      return controller.getChatResponse({ message: "ola" }, res, " ").then(result => {
        expect(typeof result).toBe("string");
      })
    });
  })

  it('A bad code should be returned when body is missing', async () => {
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    return controller.getChatResponse({ messae: "ola" }, res, " ").then(result => {
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    })
  });

})


