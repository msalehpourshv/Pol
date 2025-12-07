import { HttpClient } from './http-client';
import { CustomerDto } from '@pol/contracts';

export class CustomersApi {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CustomerDto[]>('/customers');
  }

  getById(id: string) {
    return this.http.get<CustomerDto>(`/customers/${id}`);
  }
}