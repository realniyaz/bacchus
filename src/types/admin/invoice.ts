export type PaymentStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "VOID";

export interface PartyDetails {
  name: string;
  address: string;
  gstin: string;
  pan: string;
  email: string;
  phone: string;
}

export interface InvoiceItemCreate {
  sku_code: string;
  description?: string;
  unit?: string;
  quantity: number;
  rate?: number;
  gst_percent?: number;
}

export interface InvoiceItemResponse {
  id: string;
  invoice_id: string;
  sku_code: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number | string;
  amount: number | string;
  gst_percent: number | string;
  igst_amount: number | string;
  line_total: number | string;
}

export interface InvoiceCreatePayload {
  customer_id: string;
  currency: string;
  due_date: string;
  supply_country: string;
  place_of_supply: string;
  billed_to: PartyDetails;
  notes?: string;
  items: InvoiceItemCreate[];
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  currency: string;
  subtotal: number | string;
  tax_amount: number | string;
  total_amount: number | string;
  status: PaymentStatus;
  due_date: string;
  issued_date: string;
  supply_country: string;
  place_of_supply: string;
  billed_by_snapshot: PartyDetails;
  billed_to_snapshot: PartyDetails;
  notes: string | null;
  items: InvoiceItemResponse[];
  created_at: string;
  updated_at: string;
}