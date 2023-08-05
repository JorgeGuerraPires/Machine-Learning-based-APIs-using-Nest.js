import { Injectable } from '@nestjs/common';

//Http calls
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';


@Injectable()
export class ChatGptService {

  constructor(private readonly httpService: HttpService) { }

  async chatGPTAPI(message: string): Promise<string> {

    const apikey = "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";


    //Setting up for our HTTP call
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      }
    };

    //Information for the http call
    const body = {
      model: "gpt-3.5-turbo",
      messages:
        [
          {
            role: "system",
            content: "You are now chatting with the AI."
          },
          {
            role: "user",
            content: message
          }
        ]
    }

    // Makeing the call to chatGPT API
    let output = await lastValueFrom(this.httpService.post('https://api.openai.com/v1/chat/completions', JSON.stringify(body), config));
    // console.log(output.data.usage);

    return output.data.choices[0].message.content;

  }

}