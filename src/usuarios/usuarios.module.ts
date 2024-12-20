import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [

    //README: Importamos el modulo de ConfigModule PARA USAR LAS VARIABLES DE ENTORNO SI ES NECESARIO 
    // ConfigModule,

    //README: Importamos el modulo de TypeOrm PARA SINCRONIZAR LA BASE DE DATOS
    TypeOrmModule.forFeature([Usuario]),
    //README: Importamos el modulo de JWTMODULE PARA PODER USAR EN EL LOGIN
    JwtModule,
  ],
  //README: EXPORTAMOS EL SERVICIO PARA PODER USARLO EN OTROS MODULOS
  exports: [UsuariosService]
})
export class UsuariosModule { }
