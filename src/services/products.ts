import axios from "axios";
import {
  Product,
  ProductCategory,
  ProductCreatePayload,
  ProductUpdatePayload,
  DeleteProductResponse,
} from "@/types/admin/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ProductQueryParams {
  category?: ProductCategory | string;
  active_only?: boolean;
  limit?: number;
  offset?: number;
}

export const productsApi = {
  list: async (params?: ProductQueryParams): Promise<Product[]> => {
    const cleanedParams: Record<string, any> = {};

    if (params) {
      if (params.category && params.category !== "ALL") {
        cleanedParams.category = params.category;
      }
      if (typeof params.active_only === "boolean") {
        cleanedParams.active_only = params.active_only;
      }
      cleanedParams.limit = params.limit ?? 50;
      cleanedParams.offset = params.offset ?? 0;
    }

    const res = await apiClient.get<Product[]>("/products", {
      headers: getAuthHeaders(),
      params: cleanedParams,
    });

    return Array.isArray(res.data) ? res.data : [];
  },

  getById: async (id: string): Promise<Product> => {
    const res = await apiClient.get<Product>(`/products/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  create: async (payload: ProductCreatePayload): Promise<Product> => {
    const res = await apiClient.post<Product>("/products", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  update: async (id: string, payload: ProductUpdatePayload): Promise<Product> => {
    const res = await apiClient.patch<Product>(`/products/${id}`, payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  deleteProduct: async (
    id: string,
    permanent: boolean = false
  ): Promise<DeleteProductResponse> => {
    const res = await apiClient.delete<DeleteProductResponse>(`/products/${id}`, {
      headers: getAuthHeaders(),
      params: { permanent },
    });
    return res.data;
  },
};