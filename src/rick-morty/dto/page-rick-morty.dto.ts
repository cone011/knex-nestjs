import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PageRickMortyDto {
  @ApiProperty({
    default: 1,
    description: 'page to show',
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;
}
