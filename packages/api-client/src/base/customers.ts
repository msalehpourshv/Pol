import { Customer } from '@pol/contracts';
import { httpGet, httpPost } from '../httpClient';

export async function getCustomers(): Promise<Customer[]> {
  return httpGet<Customer[]>('/base/customers');
}

export async function createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
  return httpPost<Customer>('/base/customers', customer);
}
