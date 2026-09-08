import axios from "axios";
import {
  Invoice,
  InvoiceCreatePayload,
  PaymentStatus,
} from "@/types/admin/invoice";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const invoicesApi = {
  list: async (params?: { customer_id?: string; status?: PaymentStatus; limit?: number; offset?: number }): Promise<Invoice[]> => {
    const res = await axios.get(`${API_BASE}/invoices`, {
      headers: getHeaders(),
      params,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const res = await axios.get(`${API_BASE}/invoices/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  create: async (payload: InvoiceCreatePayload): Promise<Invoice> => {
    const res = await axios.post(`${API_BASE}/invoices`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  updateStatus: async (id: string, status: PaymentStatus): Promise<Invoice> => {
    const res = await axios.patch(`${API_BASE}/invoices/${id}/status`, { status }, {
      headers: getHeaders(),
    });
    return res.data;
  },

  voidOrDelete: async (id: string, permanent: boolean = false): Promise<{ status: string; message: string }> => {
    const res = await axios.delete(`${API_BASE}/invoices/${id}`, {
      headers: getHeaders(),
      params: { permanent },
    });
    return res.data;
  },

  getDispatchPdfUrl: (invoiceId: string): string => {
    const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : "";
    const origin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "http://localhost:8000";
    return `${origin}/api/v1/invoices/${invoiceId}/dispatch-pdf?token=${token}`;
  },
};