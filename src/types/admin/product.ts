export type ProductCategory =
  | "SINGLE_MALT"
  | "BLENDED_WHISKY"
  | "VODKA"
  | "RUM"
  | "GIN"
  | "RTD";

export interface Product {
  id: string;
  sku_code: string;
  name: string;
  category: ProductCategory;
  description: string | null;
  unit: string;
  bottle_volume: string;
  bottles_per_case: number;
  abv: string;
  base_rate: number | string;
  default_gst_percent: number | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreatePayload {
  sku_code: string;
  name: string;
  category: ProductCategory;
  description?: string;
  unit?: string;
  bottle_volume?: string;
  bottles_per_case?: number;
  abv?: string;
  base_rate: number;
  default_gst_percent?: number;
  is_active?: boolean;
}

export interface ProductUpdatePayload {
  name?: string;
  category?: ProductCategory;
  description?: string;
  unit?: string;
  bottle_volume?: string;
  bottles_per_case?: number;
  abv?: string;
  base_rate?: number;
  default_gst_percent?: number;
  is_active?: boolean;
}

export interface DeleteProductResponse {
  status: string;
  message: string;
}