import { Module } from '@nestjs/common';
import { RickMortyService } from './rick-morty.service';
import { RickMortyController } from './rick-morty.controller';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [RickMortyController],
  providers: [RickMortyService],
  imports: [CommonModule],
})
export class RickMortyModule {}
