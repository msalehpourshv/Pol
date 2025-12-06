import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceHeaderForm from '../components/InvoiceHeaderForm';
import InvoiceDetailTable from '../components/InvoiceDetailTable';
import { SaleInvoices } from '@pol/api-client';
import { SalesInvoiceDetail, SalesInvoiceHeader } from '@pol/contracts';
import { Button } from '@pol/ui-react';

const InvoiceEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [header, setHeader] = React.useState<SalesInvoiceHeader>({
    id: id || 'new',
    customerId: '',
    date: new Date().toISOString(),
    currency: 'USD',
    warehouseId: '',
    totalAmount: 0,
  });
  const [details, setDetails] = React.useState<SalesInvoiceDetail[]>([]);

  React.useEffect(() => {
    if (id) {
      SaleInvoices.getInvoiceById(id).then((data) => {
        setHeader(data.header);
        setDetails(data.details);
      });
    }
  }, [id]);

  const save = async () => {
    await SaleInvoices.saveInvoice({ header, details });
    navigate('/app/sale/invoices');
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2>{id ? 'Edit Invoice' : 'New Invoice'}</h2>
      <InvoiceHeaderForm header={header} onChange={setHeader} />
      <InvoiceDetailTable details={details} onChange={setDetails} />
      <Button onClick={save}>Save</Button>
    </div>
  );
};

export default InvoiceEditPage;
