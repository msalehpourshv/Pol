import { SalesInvoiceDetail, SalesInvoiceHeader } from '@pol/contracts';
import { httpGet, httpPost } from '../httpClient';

export interface InvoicePayload {
  header: SalesInvoiceHeader;
  details: SalesInvoiceDetail[];
}

export async function getInvoices(): Promise<SalesInvoiceHeader[]> {
  return httpGet<SalesInvoiceHeader[]>('/sale/invoices');
}

export async function getInvoiceById(id: string): Promise<InvoicePayload> {
  return httpGet<InvoicePayload>(`/sale/invoices/${id}`);
}

export async function saveInvoice(payload: InvoicePayload): Promise<{ id: string }>
{
  return httpPost<{ id: string }>('/sale/invoices', payload);
}
