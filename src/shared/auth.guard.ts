import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return false;
        }

        const user = await this.validateRequest(request.headers.authorization);

        request.user = user;

        return true;
    }

    async validateRequest(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
        }

        const token = auth.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);

            return decoded;
        } catch (err) {
            const message = 'Token Error: ' + (err.message || err.name);

            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}