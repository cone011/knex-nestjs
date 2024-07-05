import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interface/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get(url);

      return data;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  post<T>(url: string, body: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  delete<T>(url: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  private handleExceptions(error: any) {
    if (error.status === 400) {
      throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
