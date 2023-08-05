// middlewares/bearer-token.middleware.ts
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.UNAUTHORIZED).send('Missing or invalid bearer token');
        } else {
            const token = authHeader.split(' ')[1];
            // Here you can add your logic to validate the bearer token, e.g., by verifying it with a token provider
            // For simplicity, let's assume it's valid for now
            next();
        }
    }
}
