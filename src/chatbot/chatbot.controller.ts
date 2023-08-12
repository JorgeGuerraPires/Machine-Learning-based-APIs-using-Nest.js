import { Controller, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';



@Controller('chatbot')
export class ChatbotController {

    constructor(private readonly chatbotService: ChatbotService) { }

    @Get("chatbot")
    async chatbot() {
        const mensage = "hey there";

        return this.chatbotService.chatbot(mensage);
    }

}
