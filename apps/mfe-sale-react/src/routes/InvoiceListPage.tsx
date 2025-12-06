import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@pol/ui-react';
import { SalesInvoiceHeader } from '@pol/contracts';
import { SaleInvoices } from '@pol/api-client';

const InvoiceListPage: React.FC = () => {
  const [invoices, setInvoices] = useState<SalesInvoiceHeader[]>([]);

  useEffect(() => {
    SaleInvoices.getInvoices().then(setInvoices).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Invoices</h2>
      <Link to="/app/sale/invoices/new">
        <Button>Create Invoice</Button>
      </Link>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            <Link to={`/app/sale/invoices/${inv.id}`}>
              {inv.id} - {inv.customerId} - {inv.totalAmount}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceListPage;
