import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotService } from './chatbot.service';

import { TestBed } from '@automock/jest';

//Http calls
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';



describe('ChatbotService', () => {
  let service: ChatbotService;
  let httpService: jest.Mocked<HttpService>;


  beforeAll(() => {

    const { unit, unitRef } = TestBed.create(ChatbotService)
      .mock(HttpService)
      .using({ get: jest.fn() })
      .compile();

    service = unit;

    httpService = unitRef.get(HttpService);

  });


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ChatbotService],
    }).compile();

    service = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Testing basic functions", () => {

    it('should be text in text out', () => {

      return service.chatbot("How long does it take to make a cake?")
        .then((result) => {
          expect(typeof result).toBe("string");

        })
    });

  })
});
