import { SetMetadata } from '@nestjs/common';
import { IRoles } from 'src/usuarios/interfaces/validRoles.interface';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: IRoles[]) => {
    return SetMetadata(META_ROLES, args)
};
