import { UseGuards, applyDecorators } from '@nestjs/common';
import { IRoles } from '../interfaces/validRoles.interface';
import { RoleProtected } from './role-protected/role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosRoleGuard } from '../guards/usuarios-role/usuarios-role.guard';

export function Auth(...roles: IRoles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UsuariosRoleGuard),
    );


}