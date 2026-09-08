import axios from "axios";
import { Customer, CustomerUpdatePayload, DeleteCustomerResponse } from "@/types/admin/customer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const customersApi = {
  list: async (params?: { country?: string; limit?: number; offset?: number }): Promise<Customer[]> => {
    const res = await axios.get(`${API_BASE}/customers`, {
      headers: getHeaders(),
      params,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Customer> => {
    const res = await axios.get(`${API_BASE}/customers/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  update: async (id: string, payload: CustomerUpdatePayload): Promise<Customer> => {
    const res = await axios.patch(`${API_BASE}/customers/${id}`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  deleteSequence: async (id: string): Promise<DeleteCustomerResponse> => {
    const res = await axios.delete(`${API_BASE}/customers/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  },
};