import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "*", // o 'http://localhost:5173'
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // 👇 SOLUCIÓN CLAVE para habilitar WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));
  Logger.log('Server on port 3000', "App");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
