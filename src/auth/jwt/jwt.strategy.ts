import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../interfaces/jwt.interface";
import { ConfigService } from "@nestjs/config";
import { CustomError } from "src/interceptors/custom-error";
import { Injectable } from "@nestjs/common";
import { IUsuarioLogueado } from "../interfaces/usuarioLogueado.interface";
import { UsuariosService } from "src/usuarios/usuarios.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly serviceUsuario: UsuariosService,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'), //VARIABLE DE ENTORNO
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),    //de la peticion en donde viene el token       
        });

    }

    //TODO: ESTO ES PARA EL AUTH TOKEN
    async validate(payload: IJwtPayload): Promise<IUsuarioLogueado> {
        const { id, identificacion, nombres, usuario } = payload;
        const userBD = await this.serviceUsuario.findOneByJwtStrategy(id);

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
            identificacion,
            nombres,
            usuario
        };
    }


}