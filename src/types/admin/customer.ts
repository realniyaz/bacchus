export interface Customer {
  id: string;
  customer_code: string;
  company_name: string;
  tax_identifier: string | null;
  country: string;
  account_manager_id: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerUpdatePayload {
  company_name?: string;
  tax_identifier?: string;
  country?: string;
  account_manager_id?: string;
}

export interface DeleteCustomerResponse {
  status: string;
  message: string;
  customer_id: string;
}