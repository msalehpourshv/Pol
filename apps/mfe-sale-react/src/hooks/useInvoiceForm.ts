import { useEffect, useState } from 'react';
import { SalesInvoiceDetail, SalesInvoiceHeader } from '@pol/contracts';
import { SaleInvoices } from '@pol/api-client';

export function useInvoiceForm(id?: string) {
  const [header, setHeader] = useState<SalesInvoiceHeader | null>(null);
  const [details, setDetails] = useState<SalesInvoiceDetail[]>([]);

  useEffect(() => {
    if (id) {
      SaleInvoices.getInvoiceById(id).then((data) => {
        setHeader(data.header);
        setDetails(data.details);
      });
    } else {
      setHeader({
        id: 'new',
        customerId: '',
        date: new Date().toISOString(),
        currency: 'USD',
        warehouseId: '',
        totalAmount: 0,
      });
      setDetails([]);
    }
  }, [id]);

  return { header, setHeader, details, setDetails };
}
