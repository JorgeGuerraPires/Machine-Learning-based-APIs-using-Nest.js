import { Injectable } from '@nestjs/common';

//Http calls
import { HttpService } from '@nestjs/axios';

import { lastValueFrom } from 'rxjs';



@Injectable()
export class ChatbotService {

    constructor(private readonly httpService: HttpService) { }

    async chatbot(mensage: string): Promise<string> {

        const apikey = "your_key_here";

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
                        content: mensage
                    }
                ]
        }


        //Make a call
        let output = await lastValueFrom(this.httpService.post('https://api.openai.com/v1/chat/completions', JSON.stringify(body), config));


        return output.data.choices[0].message.content;

    }

}
