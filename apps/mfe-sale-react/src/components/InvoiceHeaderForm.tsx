import React from 'react';
import { SalesInvoiceHeader } from '@pol/contracts';
import { TextInput } from '@pol/ui-react';

type Props = {
  header: SalesInvoiceHeader;
  onChange: (header: SalesInvoiceHeader) => void;
};

const InvoiceHeaderForm: React.FC<Props> = ({ header, onChange }) => {
  const update = (field: keyof SalesInvoiceHeader, value: string) => {
    onChange({ ...header, [field]: value });
  };

  return (
    <div style={{ display: 'grid', gap: '8px', maxWidth: '400px' }}>
      <label>
        Customer Id
        <TextInput value={header.customerId} onChange={(e) => update('customerId', e.target.value)} />
      </label>
      <label>
        Date
        <TextInput value={header.date} onChange={(e) => update('date', e.target.value)} />
      </label>
      <label>
        Currency
        <TextInput value={header.currency} onChange={(e) => update('currency', e.target.value)} />
      </label>
      <label>
        Warehouse
        <TextInput value={header.warehouseId} onChange={(e) => update('warehouseId', e.target.value)} />
      </label>
      <label>
        Total Amount
        <TextInput
          value={header.totalAmount}
          onChange={(e) => update('totalAmount', Number(e.target.value))}
          type="number"
        />
      </label>
    </div>
  );
};

export default InvoiceHeaderForm;
