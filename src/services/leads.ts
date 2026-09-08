import axios from "axios";
import { Lead, LeadCreatePayload, LeadUpdatePayload } from "@/types/admin/lead";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const leadsApi = {
  list: async (params?: { tier?: string; status?: string; search?: string }): Promise<Lead[]> => {
    const res = await axios.get(`${API_BASE}/leads`, {
      headers: getHeaders(),
      params,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Lead> => {
    const res = await axios.get(`${API_BASE}/leads/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  create: async (payload: LeadCreatePayload): Promise<Lead> => {
    const res = await axios.post(`${API_BASE}/leads`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  update: async (id: string, payload: LeadUpdatePayload): Promise<Lead> => {
    const res = await axios.patch(`${API_BASE}/leads/${id}`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },
};