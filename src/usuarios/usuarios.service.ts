import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto, LoginUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomError } from 'src/interceptors/custom-error';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from './interfaces/jwt.interface';
import { IUsuarioLogueado } from './interfaces/usuarioLogueado.interface';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) //para conectarnos a la base de datos
    private readonly oneRepository: Repository<Usuario>,
    //para token

    private readonly serviceToken: JwtService,
  ) { }

  //README: METODO QUE USA JWT STRATEGY PARA VALIDAR EL TOKEN
  async findOneByJwtStrategy(id: number) {
    const dato = await this.oneRepository.findOne({
      where: {
        id: id
      }
    });
    return dato;
  }


  async create(createUsuarioDto: CreateUsuarioDto, usuarioLogueado: IUsuarioLogueado) {
    console.log({ usuarioLogueado });

    const existe = await this.findOneBy({ usuario: createUsuarioDto.usuario });
    if (existe) {
      throw new CustomError(422, `Ya existe el usuario ${createUsuarioDto.identificacion} en el sistema.`);
    }
    const nuevo = this.oneRepository.create({
      identificacion: createUsuarioDto.identificacion,
      nombres: createUsuarioDto.nombres,
      usuario: createUsuarioDto.usuario,
      password: bcrypt.hashSync(createUsuarioDto.password, 10),
    });

    await this.oneRepository.save(nuevo)
    delete nuevo.password;
    return nuevo;
  }

  async login(data: LoginUsuarioDto) {
    const userBd = await this.oneRepository.findOne({
      where: { usuario: data.usuario },
    });

    if (!userBd) {
      throw new CustomError(401, `Credenciales no validas.`);
    }

    if (!bcrypt.compareSync(data.password, userBd.password)) {
      throw new CustomError(401, `Credenciales no validas..`);
    }
    return {
      usuario: userBd,
      token: this.getToken({
        id: userBd.id,
        usuario: userBd.usuario,
        nombres: userBd.nombres,
        identificacion: userBd.identificacion
      }),
    };
  }

  private getToken(payload: IJwtPayload) {
    const token = this.serviceToken.sign(payload);
    return token;
  }



  findAll() {
    return `This action returns all usuarios`;
  }

  async findOneBy(consulta: any) {
    console.log("llegando");
    return await this.oneRepository.findOne({ where: consulta });
  }


  findOne(id: number) {
    return 'finOne';
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
