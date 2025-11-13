import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = request.cookies.ecommerceToken;
    if (!token) throw new UnauthorizedException('Token no proporcionado');

    try {
      const decoded = jwt.verify(token, 'secret-key');
      if (decoded){
        request.user = decoded;
        return true;

      }
      return false
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
