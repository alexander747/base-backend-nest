import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { ResponseFormatInterceptor } from './interceptors/respuestas.interceptor';
import { ErrorFormatFilter } from './interceptors/errores.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //para anteponer prefijos a los endpoints
  app.setGlobalPrefix('api/v1')

  //para poder usar los dto con las clases validadoras
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  // Aumentar el tamaño máximo del payload a 10 MB, por ejemplo
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Aplicar el interceptor a nivel de aplicación
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // Aplicar el filtro de excepciones a nivel de aplicación
  app.useGlobalFilters(new ErrorFormatFilter());

  //APLICAR CORS PARA QUE ACEPTE TODOS LAS PETICIONES
  app.enableCors({
    origin: '*', // Origen permitido (URL de la aplicación cliente)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],      // Métodos HTTP permitidos
    // allowedHeaders: ['Content-Type'], // Cabeceras permitidas
    // credentials: true              // Permitir credenciales (cookies, encabezados de autorización, etc.)
  });


  await app.listen(3002);

  console.log("Aplicacion corriendo en el puerto 3002 !!!");


}
bootstrap();
