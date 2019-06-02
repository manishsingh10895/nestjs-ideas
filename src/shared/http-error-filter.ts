import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';


@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {

        console.log(exception);

        const ctx = host.switchToHttp();

        const response = ctx.getResponse();

        const request = ctx.getRequest();

        const status = exception instanceof HttpException ?
            exception.getStatus() :
            HttpStatus.INTERNAL_SERVER_ERROR;

        console.log(status);

        const message = exception instanceof HttpException
            ? exception.message.error || exception.message : "Unknown Error";

        return response.status(status).json({
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: message
        })
    }
}