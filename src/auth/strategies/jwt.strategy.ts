import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'miclave',
    });
  }

  async validate(payload: any) {
    // El payload es el contenido del token
    // Por ejemplo: { id: 1, name: 'Brandon', rol: 'Admin' }
    return { userId: payload.id, name: payload.name, rol: payload.rol };
  }
}
