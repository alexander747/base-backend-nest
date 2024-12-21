import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { CustomError } from "src/interceptors/custom-error";

export const GetUserLogueado = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
        throw new CustomError(500, `Internal server error, usuario no encontrado en request.`);
    }
    return user;
});