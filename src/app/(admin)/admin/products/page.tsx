"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Layers,
  Search,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  AlertCircle,
  Sparkles,
  Receipt,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Product, ProductCategory } from "@/types/admin/product";
import { productsApi } from "@/services/products";
import CreateProductModal from "@/components/admin/modals/CreateProductModal";
import ProductDetailDrawer from "@/components/admin/drawers/ProductDetailDrawer";
import DeleteProductModal from "@/components/admin/modals/DeleteProductModal";

export default function ProductsCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeOnly, setActiveOnly] = useState<boolean>(false);

  // Modal & Drawer Interactions
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await productsApi.list({ active_only: activeOnly });
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to load catalog from FastAPI backend.");
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Distillery Master Catalog
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">GET /api/v1/products</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Product Catalog &amp; SKUs
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh Catalog"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`} />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#2A261F] shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Add SKU</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by SKU code, commercial label, or tasting notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="SINGLE_MALT">Single Malt</option>
            <option value="BLENDED_WHISKY">Blended Whisky</option>
            <option value="VODKA">Vodka</option>
            <option value="RUM">Rum</option>
            <option value="GIN">Gin</option>
            <option value="RTD">Ready-To-Drink</option>
          </select>

          <label className="flex items-center gap-2 text-xs text-[#554F43] cursor-pointer whitespace-nowrap px-2">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
              className="rounded border-[#8E7626]/30 text-[#14120E]"
            />
            <span>Active Only</span>
          </label>
        </div>
      </div>

      {/* 3. Products Table */}
      <div className="rounded-2xl border border-[#8E7626]/30 bg-[#FAF7F2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7626]/20 bg-[#F4EFE6] text-[#7A7366] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 font-bold">SKU Code</th>
                <th className="py-4 px-6 font-bold">Commercial Label</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold">Packing &amp; Proof</th>
                <th className="py-4 px-6 font-bold">Base Rate</th>
                <th className="py-4 px-6 font-bold">Default GST</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7626]/15">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#8E7626]" />
                      <span>Loading master SKU catalog...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366]">
                    <Layers className="w-8 h-8 text-[#8E7626]/40 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#14120E]">No Catalog SKUs Found</p>
                    <p className="text-xs text-[#7A7366] mt-0.5">
                      Register a new spirits SKU to make it available for commercial billing.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    onClick={() => setActiveProduct(prod)}
                    className="hover:bg-[#EFE8DC]/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {prod.sku_code}
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E] group-hover:text-[#8E7626] transition-colors">
                        {prod.name}
                      </p>
                      <p className="text-[10px] text-[#7A7366] line-clamp-1 max-w-sm mt-0.5">
                        {prod.description || "Master distillery bottling formulation."}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#EFE8DC] border border-[#8E7626]/20 text-[#554F43] font-semibold uppercase">
                        {prod.category.replace("_", " ")}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-[#554F43]">
                      <div className="font-mono text-xs">
                        {prod.bottle_volume} &bull; {prod.abv}
                      </div>
                      <span className="text-[10px] text-[#7A7366]">
                        {prod.bottles_per_case} btls / {prod.unit}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-mono font-bold text-[#14120E]">
                      ₹{Number(prod.base_rate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-semibold text-[#8E7626]">
                        {prod.default_gst_percent}%
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProduct(prod);
                          }}
                          className="p-1.5 rounded-lg border border-[#8E7626]/20 bg-white hover:border-[#8E7626] text-[#8E7626] cursor-pointer"
                          title="View & Edit SKU"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductToDelete(prod);
                          }}
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                          title="Delete / Deactivate SKU"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Displaying <strong className="text-[#14120E]">{filteredProducts.length}</strong> of{" "}
            {products.length} catalog items
          </span>
          <span className="font-mono text-[10px]">Production Catalog &bull; 19 Corridors</span>
        </div>
      </div>

      {/* Ingest SKU Modal */}
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchProducts}
      />

      {/* Product Drawer */}
      <ProductDetailDrawer
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onUpdated={() => {
          fetchProducts();
          setActiveProduct(null);
        }}
        onDeleteRequested={(prod) => {
          setActiveProduct(null);
          setProductToDelete(prod);
        }}
      />

      {/* Delete Modal */}
      <DeleteProductModal
        product={productToDelete}
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onSuccess={fetchProducts}
      />
    </div>
  );
}