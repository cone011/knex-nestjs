import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { KnexModule } from 'nest-knexjs';
import { envs } from './config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { RickMortyModule } from './rick-morty/rick-morty.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    CommonModule,

    KnexModule.forRoot({
      config: {
        client: envs.dbType,
        connection: {
          host: envs.dbHost,
          user: envs.dbUserName,
          password: envs.dbPassword,
          database: envs.dbName,
        },
      },
    }),

    ProductsModule,

    AuthModule,

    RickMortyModule,
  ],
})
export class AppModule {}
