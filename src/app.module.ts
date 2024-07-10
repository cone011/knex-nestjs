import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { KnexModule } from 'nest-knexjs';
import { envs } from './config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { RickMortyModule } from './rick-morty/rick-morty.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    CommonModule,

    //SOLO PARA USAR EL SEED
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUserName,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize: true,
    }),

    KnexModule.forRoot({
      config: {
        client: envs.dbType,
        connection: {
          host: envs.dbHost,
          user: envs.dbUserName,
          password: envs.dbPassword,
          database: envs.dbName,
        },
        migrations: {
          tableName: 'knex_migrations',
        },
        // add this
        seeds: {
          directory: './src/seeds',
        },
      },
    }),

    ProductsModule,

    AuthModule,

    RickMortyModule,

    SeedModule,
  ],
})
export class AppModule {}
