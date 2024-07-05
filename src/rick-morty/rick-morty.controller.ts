import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RickMortyService } from './rick-morty.service';
import { PageRickMortyDto } from './dto/page-rick-morty.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@Controller('rick-morty')
export class RickMortyController {
  constructor(private readonly rickMortyService: RickMortyService) {}

  @Get()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status: 200, description: 'Rick and morty caracters info' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  findAll(@Query() pageRikcMortyDto: PageRickMortyDto) {
    return this.rickMortyService.findAll(pageRikcMortyDto);
  }
}
