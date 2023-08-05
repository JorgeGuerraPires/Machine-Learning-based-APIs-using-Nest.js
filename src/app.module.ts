import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BearerTokenMiddleware } from './custom-decorators/middlewares/bearer-token.middleware';



@Module({
  imports: [ChatGptModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .forRoutes('chat-gpt');
  }
}
