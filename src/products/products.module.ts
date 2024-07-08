import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    CommonModule,
    //Se usa solo para ejectuar el seed
    TypeOrmModule.forFeature([Product]),
  ],
  exports: [
    //Se usa solo para ejectuar el seed
    TypeOrmModule,
  ],
})
export class ProductsModule {}
