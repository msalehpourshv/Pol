import { HttpClient } from './http-client';
import { CustomerDto, InvoiceDto } from '@pol/contracts';

export class InvoiceApi {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<InvoiceDto[]>('/invoice');
  }

  getById(id: string) {
    return this.http.get<InvoiceDto>(`/invoice/${id}`);
  }
}