import { useEffect, useState } from 'react';
import { SalesInvoiceHeader } from '@pol/contracts';
import { SaleInvoices } from '@pol/api-client';

export function useInvoices() {
  const [invoices, setInvoices] = useState<SalesInvoiceHeader[]>([]);

  useEffect(() => {
    SaleInvoices.getInvoices().then(setInvoices);
  }, []);

  return invoices;
}
