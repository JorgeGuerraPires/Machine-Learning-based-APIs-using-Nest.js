import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { ChatGptController } from './chat-gpt.controller';

//Http calls
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [ChatGptController],
  providers: [ChatGptService]
})
export class ChatGptModule { }
