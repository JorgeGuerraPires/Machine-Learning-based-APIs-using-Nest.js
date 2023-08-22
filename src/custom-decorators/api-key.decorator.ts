// custom-decorators/api-key.decorator.ts
import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export const ApiKey = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const userservice = new UsersService();

        const request = ctx.switchToHttp().getRequest();
        const apiKey = request.headers['authorization'].split(" ")[1]; // Assuming the API key is sent in the 'api-key' header      

        // Replace 'YOUR_SECRET_API_KEY' with the actual API key you want to validate against
        // const isValidApiKey = apiKey === 'YOUR_SECRET_API_KEY';
        const isValidApiKey = await userservice.checkAPIKey(apiKey);

        if (!isValidApiKey) {
            ctx.switchToHttp().getResponse().status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid API key' });
            throw new Error('Invalid API key');

        }
        return apiKey;
    },
);