import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';


describe('ChatbotController', () => {
  let controller: ChatbotController;
  
  let chatbotservice = {
    provide: ChatbotService,
    useValue: { chatbot: jest.fn().mockImplementation((mensage: string) => "teste") }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotController],
      providers: [chatbotservice]
    }).compile();

    controller = module.get<ChatbotController>(ChatbotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a text', () => {
    return controller.chatbot().then((result) => {
      expect(typeof result).toBe("string");
    })
  });

});
