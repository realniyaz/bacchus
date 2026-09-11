import axios from "axios";
import { Lead, LeadCreatePayload, LeadUpdatePayload } from "@/types/admin/lead";

// 1. Fallback to the live Render gateway rather than dead localhost
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

// 2. Safe client-side token extractor
const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 3. Centralized client instance with fail-fast timeout (10s)
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LeadQueryParams {
  tier?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export const leadsApi = {
  list: async (params?: LeadQueryParams): Promise<Lead[]> => {
    // Filter out "ALL" values so FastAPI doesn't choke on query params
    const queryParams: Record<string, any> = {};
    if (params) {
      if (params.tier && params.tier !== "ALL") queryParams.tier = params.tier;
      if (params.status && params.status !== "ALL") queryParams.status = params.status;
      if (params.search) queryParams.search = params.search;
      if (params.limit) queryParams.limit = params.limit;
      if (params.offset !== undefined) queryParams.offset = params.offset;
    }

    const res = await apiClient.get<Lead[]>("/leads", {
      headers: getAuthHeaders(),
      params: queryParams,
    });

    // Ensure state always receives a valid iterable
    return Array.isArray(res.data) ? res.data : [];
  },

  getById: async (id: string): Promise<Lead> => {
    const res = await apiClient.get<Lead>(`/leads/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  create: async (payload: LeadCreatePayload): Promise<Lead> => {
    const res = await apiClient.post<Lead>("/leads", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  update: async (id: string, payload: LeadUpdatePayload): Promise<Lead> => {
    const res = await apiClient.patch<Lead>(`/leads/${id}`, payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
};