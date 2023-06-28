import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // <- global prefix

  const port = Number(process.env.PORT);

  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
