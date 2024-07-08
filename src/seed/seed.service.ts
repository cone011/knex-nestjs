import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const user = await this.insertUser();

    await this.insertNewProducts();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUser() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUser = await this.userRepository.save(users);

    return dbUser[0];
  }

  private async deleteAllProducts() {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder();
      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private async insertNewProducts() {
    await this.deleteAllProducts();

    const products = initialData.products;

    const productsEntity = this.productRepository.create(products);
    await this.productRepository.insert(productsEntity);

    return true;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
