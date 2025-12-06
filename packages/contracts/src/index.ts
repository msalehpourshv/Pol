export interface Customer {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
}

export interface SalesInvoiceHeader {
  id: string;
  customerId: string;
  date: string; // ISO string
  currency: string;
  warehouseId: string;
  totalAmount: number;
}

export interface SalesInvoiceDetail {
  id: string;
  invoiceId: string;
  lineNo: number;
  productId: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
}
