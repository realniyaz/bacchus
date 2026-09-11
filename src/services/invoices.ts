import axios from "axios";
import {
  Invoice,
  InvoiceCreatePayload,
  PaymentStatus,
} from "@/types/admin/invoice";

// 1. Production defaults matching live Render deployment
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

const BACKEND_ORIGIN =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN ||
  "https://bacchus-crm-backend.onrender.com";

// 2. Safe client-side token helper
const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 3. Centralized client instance with 10s timeout
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface InvoiceQueryParams {
  customer_id?: string;
  status?: PaymentStatus | string;
  limit?: number;
  offset?: number;
}

export const invoicesApi = {
  list: async (params?: InvoiceQueryParams): Promise<Invoice[]> => {
    const cleanedParams: Record<string, any> = {};

    if (params) {
      if (params.customer_id) cleanedParams.customer_id = params.customer_id;
      if (params.status && params.status !== "ALL") {
        cleanedParams.status = params.status;
      }
      cleanedParams.limit = params.limit ?? 50;
      cleanedParams.offset = params.offset ?? 0;
    }

    const res = await apiClient.get<Invoice[]>("/invoices", {
      headers: getAuthHeaders(),
      params: cleanedParams,
    });

    return Array.isArray(res.data) ? res.data : [];
  },

  getById: async (id: string): Promise<Invoice> => {
    const res = await apiClient.get<Invoice>(`/invoices/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  create: async (payload: InvoiceCreatePayload): Promise<Invoice> => {
    const res = await apiClient.post<Invoice>("/invoices", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  updateStatus: async (id: string, status: PaymentStatus): Promise<Invoice> => {
    const res = await apiClient.patch<Invoice>(
      `/invoices/${id}/status`,
      { status },
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  },

  voidOrDelete: async (
    id: string,
    permanent: boolean = false
  ): Promise<{ status: string; message: string }> => {
    const res = await apiClient.delete<{ status: string; message: string }>(
      `/invoices/${id}`,
      {
        headers: getAuthHeaders(),
        params: { permanent },
      }
    );
    return res.data;
  },

  getDispatchPdfUrl: (invoiceId: string): string => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("bacchus_token") || ""
        : "";
    return `${BACKEND_ORIGIN}/api/v1/invoices/${invoiceId}/dispatch-pdf?token=${token}`;
  },
};