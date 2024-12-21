import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logsMiddleware';


@Module({
  imports: [
    //README: carga las variables de entorno, sudo npm i @nestjs/config
    ConfigModule.forRoot(
      {
        isGlobal: true,  // Esto hace que las variables de entorno sean accesibles en toda la aplicación

      }),

    //REAME: Para trabajar con typeOrm
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //TODO: carga las entidades automaticamente en la base de datos
      synchronize: true, //TODO: en produccion en false
      // timezone: 'America/Bogota',
    }),
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplica el middleware LoggerMiddleware a todas las rutas de la aplicación
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Registra el middleware para todas las rutas
  }
}
