import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "../entities/usuario.entity";
import { IJwtPayload } from "../interfaces/jwt.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { CustomError } from "src/interceptors/custom-error";
import { Injectable } from "@nestjs/common";
import { IUsuarioLogueado } from "../interfaces/usuarioLogueado.interface";


//TODO:  JwtStrategy Se tiene que importar en los providers porque es un injectable y se debe exportar para otros modulos
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(

        @InjectRepository(Usuario)
        private readonly serviceUsuario: Repository<Usuario>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'), //VARIABLE DE ENTORNO
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),    //de la peticion en donde viene el token       
        });

    }

    //TODO: ESTO ES PARA EL AUTH TOKEN
    async validate(payload: IJwtPayload): Promise<IUsuarioLogueado> {
        const {
            id,
            usuario,
            nombres,
            identificacion
        } = payload;
        const userBD = await this.serviceUsuario.findOne({
            where: {
                id
            },
            // relations: {
            //     empresas: true
            // }
        });

        if (!userBD) {
            throw new CustomError(401, `Token invalido`);
        }

        if (!userBD.activo) {
            throw new CustomError(401, `Usuario inactivo.`);
        }
        // console.log("============================>", userBD)

        //TODO: ESTO SE AGREGA AL REQUEST DE LA PETICION HTTP
        return {
            id,
            usuario,
            nombres,
            identificacion

        };
    }


}