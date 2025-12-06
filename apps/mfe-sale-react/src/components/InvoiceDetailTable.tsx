import React from 'react';
import { SalesInvoiceDetail } from '@pol/contracts';
import { Button, TextInput } from '@pol/ui-react';

type Props = {
  details: SalesInvoiceDetail[];
  onChange: (details: SalesInvoiceDetail[]) => void;
};

const InvoiceDetailTable: React.FC<Props> = ({ details, onChange }) => {
  const addLine = () => {
    const lineNo = details.length + 1;
    onChange([
      ...details,
      {
        id: `${lineNo}`,
        invoiceId: 'new',
        lineNo,
        productId: '',
        quantity: 1,
        unitPrice: 0,
        taxPercent: 0,
      },
    ]);
  };

  const updateLine = (index: number, field: keyof SalesInvoiceDetail, value: string | number) => {
    const updated = [...details];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      <Button onClick={addLine}>Add Line</Button>
      <table border="1" cellPadding={8} style={{ marginTop: '8px' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Tax %</th>
          </tr>
        </thead>
        <tbody>
          {details.map((d, idx) => (
            <tr key={d.id}>
              <td>
                <TextInput
                  value={d.productId}
                  onChange={(e) => updateLine(idx, 'productId', e.target.value)}
                />
              </td>
              <td>
                <TextInput
                  type="number"
                  value={d.quantity}
                  onChange={(e) => updateLine(idx, 'quantity', Number(e.target.value))}
                />
              </td>
              <td>
                <TextInput
                  type="number"
                  value={d.unitPrice}
                  onChange={(e) => updateLine(idx, 'unitPrice', Number(e.target.value))}
                />
              </td>
              <td>
                <TextInput
                  type="number"
                  value={d.taxPercent}
                  onChange={(e) => updateLine(idx, 'taxPercent', Number(e.target.value))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetailTable;
