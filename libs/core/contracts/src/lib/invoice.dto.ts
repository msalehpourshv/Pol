export interface InvoiceItemDto {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceDto {
  id: string;
  customerId: string;
  total: number;
  items: InvoiceItemDto[];
}