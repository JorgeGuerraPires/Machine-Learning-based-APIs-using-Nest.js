import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';


//Http calls
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [ChatbotController],
  providers: [ChatbotService]
})
export class ChatbotModule { }
