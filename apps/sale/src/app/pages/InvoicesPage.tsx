import { useEffect, useState } from 'react';
import { InvoiceDto } from '@pol/contracts';
import { InvoiceApi, HttpClient } from '@pol/service-proxy';

const http = new HttpClient(import.meta.env.VITE_API_BASE_URL, () =>
  localStorage.getItem('token'),
);
const invoiceApi = new InvoiceApi(http);

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceDto[]>([]);

  useEffect(() => {
    invoiceApi.getAll().then(setInvoices);
  }, []);

  return (
    <div>
      <h1>فاکتورها</h1>
      {/* <AppButton variant="primary">فاکتور جدید</AppButton> */}

      <ul>
        {invoices.map(inv => (
          <li key={inv.id}>
            {inv.id} - {inv.total}
          </li>
        ))}
      </ul>
    </div>
  );
}