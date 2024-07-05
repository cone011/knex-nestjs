import { Injectable } from '@nestjs/common';
import { PageRickMortyDto } from './dto/page-rick-morty.dto';
import { ResultApi } from './interfaces/rick-morty.interface';
import { AxiosAdapter } from '../common/adapter';

@Injectable()
export class RickMortyService {
  constructor(private readonly http: AxiosAdapter) {}

  async findAll(pageRikcMortyDto: PageRickMortyDto) {
    const { page = 1 } = pageRikcMortyDto;

    const dataResult: ResultApi = await this.http.get(
      `https://rickandmortyapi.com/api/character?page=${page}`,
    );

    const { results } = dataResult;

    return results;
  }
}
