"use client";

import React, { useState, useEffect } from "react";
import { X, Layers, Save, Trash2, Loader2, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { Product, ProductCategory, ProductUpdatePayload } from "@/types/admin/product";
import { productsApi } from "@/services/products";

interface Props {
  product: Product | null;
  onClose: () => void;
  onUpdated: () => void;
  onDeleteRequested: (product: Product) => void;
}

const CATEGORY_OPTIONS: { label: string; value: ProductCategory }[] = [
  { label: "Single Malt Whisky", value: "SINGLE_MALT" },
  { label: "Blended Scotch / Whisky", value: "BLENDED_WHISKY" },
  { label: "Artisanal Vodka", value: "VODKA" },
  { label: "Overproof Spiced Rum", value: "RUM" },
  { label: "Botanical Gin", value: "GIN" },
  { label: "Ready-To-Drink (RTD)", value: "RTD" },
];

export default function ProductDetailDrawer({ product, onClose, onUpdated, onDeleteRequested }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProductUpdatePayload>({
    name: "",
    category: "SINGLE_MALT",
    description: "",
    unit: "Cases",
    bottle_volume: "750 ml",
    bottles_per_case: 12,
    abv: "42.8% V/V",
    base_rate: 3500.0,
    default_gst_percent: 18.0,
    is_active: true,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        description: product.description || "",
        unit: product.unit,
        bottle_volume: product.bottle_volume,
        bottles_per_case: product.bottles_per_case,
        abv: product.abv,
        base_rate: Number(product.base_rate),
        default_gst_percent: Number(product.default_gst_percent),
        is_active: product.is_active,
      });
      setIsEditing(false);
      setError(null);
    }
  }, [product]);

  if (!product) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await productsApi.update(product.id, {
        name: form.name?.trim(),
        category: form.category,
        description: form.description?.trim() || undefined,
        unit: form.unit?.trim(),
        bottle_volume: form.bottle_volume?.trim(),
        bottles_per_case: Number(form.bottles_per_case),
        abv: form.abv?.trim(),
        base_rate: Number(form.base_rate),
        default_gst_percent: Number(form.default_gst_percent),
        is_active: form.is_active,
      });
      setIsEditing(false);
      onUpdated();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update SKU parameters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FAF7F2] border-l border-[#8E7626]/30 shadow-2xl flex flex-col justify-between text-[#14120E] antialiased">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div>
            <span className="font-mono text-xs text-[#8E7626] font-bold tracking-wider">
              {product.sku_code}
            </span>
            <h3 className="font-serif text-xl font-bold mt-0.5">{product.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#7A7366] hover:text-[#14120E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-190px)]">
          {!isEditing ? (
            <>
              {/* Product Pricing Snapshot */}
              <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366] block">
                    Base Billing Rate
                  </span>
                  <p className="font-serif text-2xl font-bold text-[#14120E] mt-0.5">
                    ₹{Number(product.base_rate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-[#7A7366] font-mono mt-0.5">Per {product.unit}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366] block">
                    Default Tax
                  </span>
                  <span className="font-mono font-bold text-[#8E7626] text-lg block">
                    {product.default_gst_percent}% GST
                  </span>
                  <span
                    className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      product.is_active
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-rose-100 text-rose-800 border border-rose-300"
                    }`}
                  >
                    {product.is_active ? "Active SKU" : "Deactivated"}
                  </span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                  Production Specifications
                </h4>
                <div className="space-y-2.5 text-xs bg-white/70 p-4 rounded-xl border border-[#8E7626]/15">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A7366]">Spirit Category</span>
                    <span className="font-mono font-bold text-[#14120E]">
                      {product.category.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#8E7626]/10 pt-2">
                    <span className="text-[#7A7366]">Alcohol Strength</span>
                    <span className="font-mono text-[#554F43]">{product.abv}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#8E7626]/10 pt-2">
                    <span className="text-[#7A7366]">Bottle Size</span>
                    <span className="font-mono text-[#554F43]">{product.bottle_volume}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#8E7626]/10 pt-2">
                    <span className="text-[#7A7366]">Bottles Per Case</span>
                    <span className="font-mono text-[#554F43]">{product.bottles_per_case} Bottles</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                    Catalog Description
                  </h4>
                  <p className="text-xs text-[#554F43] leading-relaxed bg-white/50 p-3 rounded-lg border border-[#8E7626]/15">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider hover:bg-[#2A261F] transition-all cursor-pointer"
                >
                  Edit SKU Specs
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteRequested(product)}
                  className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  title="Remove SKU"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                  Commercial Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                    Strength (ABV)
                  </label>
                  <input
                    type="text"
                    value={form.abv}
                    onChange={(e) => setForm({ ...form, abv: e.target.value })}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                    Base Rate (INR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.base_rate}
                    onChange={(e) => setForm({ ...form, base_rate: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                    Default GST (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.default_gst_percent}
                    onChange={(e) => setForm({ ...form, default_gst_percent: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sku-active-checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-[#8E7626]/30 text-[#14120E] focus:ring-[#8E7626]"
                />
                <label htmlFor="sku-active-checkbox" className="text-xs font-medium text-[#14120E]">
                  Active in Commercial Invoice Selector
                </label>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                  Description / Tasting Notes
                </label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full mt-1 p-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 text-xs rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save SKU</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#8E7626]/20 bg-[#F4EFE6] text-[10px] font-mono text-[#7A7366] flex justify-between items-center">
        <span>SKU: {product.sku_code}</span>
        <span>Registered: {new Date(product.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}