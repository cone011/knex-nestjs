import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { isUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel()
    private readonly knex: Knex,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = {
        id: uuid(),
        title: createProductDto.title,
        price: createProductDto.price,
        description: createProductDto.description,
        slug: createProductDto.slug,
        stock: createProductDto.stock,
        sizes: '{"' + createProductDto.sizes.join('","') + '"}',
        gender: createProductDto.gender,
        tags: '{"' + createProductDto.tags.join('","') + '"}',
      };

      await this.knex.table('products').insert({ ...product });

      return {
        id: product.id,
        ...createProductDto,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.knex
      .select('*')
      .table('products')
      .offset(offset)
      .limit(limit);

    return users;
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.knex.table('products').where('id', term).first();
    } else {
      product = await this.knex
        .table('products')
        .where({ title: term })
        .orWhere({ slug: term })
        .first();
    }

    if (!product) {
      throw new NotFoundException(`Product with ${term} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    const updateProduct = {
      title: updateProductDto.title,
      price: updateProductDto.price,
      description: updateProductDto.description,
      slug: updateProductDto.slug,
      stock: updateProductDto.stock,
      sizes: '{"' + updateProductDto.sizes.join('","') + '"}',
      gender: updateProductDto.gender,
      tags: '{"' + updateProductDto.tags.join('","') + '"}',
    };

    await this.knex()
      .table('products')
      .where('id', id)
      .update({ updateProduct });

    return {
      id: product.id,
      ...updateProduct,
    };
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.knex().table('products').delete().where('id', id);

    return product;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
