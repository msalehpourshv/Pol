import { Injectable } from '@angular/core';
import { BaseCustomers } from '@pol/api-client';
import { Customer } from '@pol/contracts';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  getCustomers(): Promise<Customer[]> {
    return BaseCustomers.getCustomers();
  }

  createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
    return BaseCustomers.createCustomer(customer);
  }
}
