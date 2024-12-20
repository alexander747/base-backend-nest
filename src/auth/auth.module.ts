import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [

    //README: Importamos el modulo de ConfigModule PARA USAR LAS VARIABLES DE ENTORNO SI ES NECESARIO 
    ConfigModule,
    //README: Importamos el modulo de PassportModule PARA USAR LA AUTENTICACION CON JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //README: Importamos el modulo de JwtModule PARA USAR LA AUTENTICACION CON JWT
    JwtModule.registerAsync({
      imports: [UsuariosModule],
      inject: [],
      useFactory: () => {
        return {
          //README: IMPORTAMOS JWT_SECRET DESDE LAS VARIABLES DE ENTORNO PARA USARLO EN EL SERVICIO
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '8h'
          }
        }
      }
    }),

    // Importamos el modulo de UsersModule para manejar los usuarios
    UsuariosModule,
  ],
  exports: [AuthService, JwtStrategy, PassportModule, JwtModule],
  controllers: [AuthController]
})
export class AuthModule { }
