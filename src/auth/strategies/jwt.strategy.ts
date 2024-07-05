import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { JwtPayload } from '../interfaces';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel()
    private readonly knex: Knex,
  ) {
    super({
      secretOrKey: envs.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user: User = await this.knex()
      .select('email', 'id', 'fullName', 'isActive', 'roles')
      .table('users')
      .where('id', id)
      .first();

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }

    return user;
  }
}
