import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CustomError } from 'src/interceptors/custom-error';
import { META_ROLES } from 'src/usuarios/decorators/role-protected/role-protected.decorator';

@Injectable()
export class UsuariosRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles) {
      return true;
    }

    if (validRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    // console.log("usuario logueado aquiiii", user);


    if (!user) {
      throw new CustomError(500, `Usuario no existe`);
    }

    // console.log("existe usuario")
    // console.log(user);
    // console.log(validRoles);



    // for (const rol of user.roles) {
    if (validRoles.includes(user.codigoRol)) {
      return true;
    }
    // }


    throw new CustomError(403, `Usuario necesita alguno de los siguientes roles para consumir el servicio ${validRoles}`)
  }
}
