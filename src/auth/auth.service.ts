import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async login(createAuthDto: CreateAuthDto) {

    const respuesta = await this.usuariosService.login(createAuthDto.usuario, createAuthDto.password);
    return respuesta;

    // const a = await this.usuariosService.login(createAuthDto.usuario, createAuthDto.password);
    // const token = this.jwtService.sign({
    //   id: a.id,
    //   usuario: a.usuario,
    //   nombres: a.nombres,
    //   identificacion: a.identificacion,
    // }, {
    //   secret: this.configService.get('JWT_SECRET'),
    //   expiresIn: '1h', // Configura el tiempo de expiración según lo necesites
    // });
    // return token;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
