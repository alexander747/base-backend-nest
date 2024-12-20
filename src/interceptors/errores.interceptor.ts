// error-format.filter.ts
import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ErrorFormatFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal several error (code 1.0)';
        let detailError: string | undefined;




        if (exception instanceof HttpException) {
            console.log("1. exception instanceof HttpException")
            const objetoError: any = exception.getResponse();
            console.log({ objetoError });
            const mensajeError = objetoError.message || 'Error contacte con el administrador del sitio.';
            const detalleError = objetoError.error || objetoError.detailError || 'Internal server error.';
            console.log({ mensajeError });
            console.log({ detalleError });

            status = exception.getStatus();
            message = mensajeError;
            detailError = detalleError;


        } else if (exception instanceof Error) {
            // Capturar el mensaje de una instancia de Error
            console.log("2. exception instanceof Error");
            console.log({ exception });
            message = 'Ups ocurrio un error, espere un momento y vuelva a intentar nuevamente.';
            detailError = exception.message || message;
        }

        const responseObject: any = {
            ok: false,
            data: null,
            message,
        };

        if (detailError) {
            responseObject.detailError = detailError;
        }

        response.status(status).json(responseObject);
    }
}
