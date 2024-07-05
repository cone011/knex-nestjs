import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
