import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import BooleanUtil from './shared/utils/boolean.util';
import { EnviromentVariablesEnum } from './shared/enums/enviroment.variables.enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const keyFileExists = fs.existsSync('./../secrets/checkin.api.key.pem');
  const certFileExists = fs.existsSync('./../secrets/checkin.api.crt.pem');
  const httpsOptions = keyFileExists && certFileExists
    ? {
      key: fs.readFileSync('./../secrets/checkin.api.key.pem'),
      cert: fs.readFileSync('./../secrets/checkin.api.crt.pem'),
    }
    : null;


  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const configService = app.get(ConfigService);
  const logger = new Logger('main');

  if (BooleanUtil.getBoolean(configService.get(EnviromentVariablesEnum.ENABLE_CORS))) {
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization'
    };
    app.enableCors(corsOptions);
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('BID API')
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
  await app.listen(port);
  logger.log(`BID API started at port ${port}`);

}
bootstrap();
