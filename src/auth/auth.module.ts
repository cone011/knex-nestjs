import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { envs } from 'src/config';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //Se usa solo para ejectuar el seed
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: envs.jwtSecret,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],

  exports: [
    JwtStrategy,
    PassportModule,
    JwtModule,
    //Se usa solo para ejectuar el seed
    TypeOrmModule,
  ],
})
export class AuthModule {}
