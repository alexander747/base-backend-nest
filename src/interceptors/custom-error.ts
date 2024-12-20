// custom-error.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
    constructor(code: number = HttpStatus.INTERNAL_SERVER_ERROR, message: string = "Error contacte con el administrador del sitio", detailError: any = "Error no especificado") {
        super({ ok: false, data: null, message, detailError }, code);
    }
}
