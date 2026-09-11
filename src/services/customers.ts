import axios from "axios";
import {
  Customer,
  CustomerUpdatePayload,
  DeleteCustomerResponse,
} from "@/types/admin/customer";

// 1. Production gateway fallback matching live Render deployment
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

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

export interface CustomerQueryParams {
  country?: string;
  limit?: number;
  offset?: number;
}

export const customersApi = {
  list: async (params?: CustomerQueryParams): Promise<Customer[]> => {
    const cleanedParams: Record<string, any> = {};

    if (params) {
      if (params.country && params.country !== "ALL") {
        cleanedParams.country = params.country;
      }
      cleanedParams.limit = params.limit ?? 50;
      cleanedParams.offset = params.offset ?? 0;
    }

    const res = await apiClient.get<Customer[]>("/customers", {
      headers: getAuthHeaders(),
      params: cleanedParams,
    });

    return Array.isArray(res.data) ? res.data : [];
  },

  getById: async (id: string): Promise<Customer> => {
    const res = await apiClient.get<Customer>(`/customers/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  update: async (
    id: string,
    payload: CustomerUpdatePayload
  ): Promise<Customer> => {
    const res = await apiClient.patch<Customer>(`/customers/${id}`, payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  deleteSequence: async (id: string): Promise<DeleteCustomerResponse> => {
    const res = await apiClient.delete<DeleteCustomerResponse>(
      `/customers/${id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  },
};