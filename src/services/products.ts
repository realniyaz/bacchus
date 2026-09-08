import axios from "axios";
import {
  Product,
  ProductCreatePayload,
  ProductUpdatePayload,
  DeleteProductResponse,
} from "@/types/admin/product";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const productsApi = {
  list: async (params?: { category?: string; active_only?: boolean; limit?: number; offset?: number }): Promise<Product[]> => {
    const res = await axios.get(`${API_BASE}/products`, {
      headers: getHeaders(),
      params,
    });
    return res.data;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await axios.get(`${API_BASE}/products/${id}`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  create: async (payload: ProductCreatePayload): Promise<Product> => {
    const res = await axios.post(`${API_BASE}/products`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  update: async (id: string, payload: ProductUpdatePayload): Promise<Product> => {
    const res = await axios.patch(`${API_BASE}/products/${id}`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  deleteProduct: async (id: string, permanent: boolean = false): Promise<DeleteProductResponse> => {
    const res = await axios.delete(`${API_BASE}/products/${id}`, {
      headers: getHeaders(),
      params: { permanent },
    });
    return res.data;
  },
};