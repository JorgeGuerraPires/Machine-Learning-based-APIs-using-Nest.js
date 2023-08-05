import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptService } from './chat-gpt.service';
import { HttpModule } from '@nestjs/axios';
import { TestBed } from '@automock/jest';
import { HttpService } from '@nestjs/axios';


describe('ChatGptService', () => {
  let service: ChatGptService;
  let httpService: jest.Mocked<HttpService>;


  beforeAll(() => {

    const { unit, unitRef } = TestBed.create(ChatGptService)
      .mock(HttpService)
      .using({ get: jest.fn() })
      .compile();

    service = unit;

    httpService = unitRef.get(HttpService);

  });


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ChatGptService],
    }).compile();

    service = module.get<ChatGptService>(ChatGptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Testing chatGPT API", () => {

    it('should return a text', () => {

      return service.chatGPTAPI("hey there").then((response) => {

        expect(typeof response).toBe("string");
      })

    });
  })

});
