import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';

import { Response } from 'express';
import { ApiKey } from '../custom-decorators/api-key.decorator';


@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) { }

  @Post()
  async getChatResponse(@Body() body: any,
    @Res({ passthrough: true }) res: Response,
    @ApiKey() apiKey: string
  ) // Using the custom decorator to get the API key
    : Promise<string> {



    if (!body.message)
      res.status(HttpStatus.BAD_REQUEST).send();


    const response = await this.chatGptService.chatGPTAPI(body.message);
    return response;
  }

}
