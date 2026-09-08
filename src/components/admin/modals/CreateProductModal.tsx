"use client";

import React, { useState } from "react";
import { X, Loader2, Sparkles, PackagePlus } from "lucide-react";
import { ProductCategory, ProductCreatePayload } from "@/types/admin/product";
import { productsApi } from "@/services/products";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORY_OPTIONS: { label: string; value: ProductCategory }[] = [
  { label: "Single Malt Whisky", value: "SINGLE_MALT" },
  { label: "Blended Scotch / Whisky", value: "BLENDED_WHISKY" },
  { label: "Artisanal Vodka", value: "VODKA" },
  { label: "Overproof Spiced Rum", value: "RUM" },
  { label: "Botanical Gin", value: "GIN" },
  { label: "Ready-To-Drink (RTD)", value: "RTD" },
];

export default function CreateProductModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ProductCreatePayload>({
    sku_code: "",
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cleanPayload: ProductCreatePayload = {
        sku_code: form.sku_code.trim().toUpperCase(),
        name: form.name.trim(),
        category: form.category,
        description: form.description?.trim() ? form.description.trim() : undefined,
        unit: form.unit?.trim() || "Cases",
        bottle_volume: form.bottle_volume?.trim() || "750 ml",
        bottles_per_case: Number(form.bottles_per_case) || 12,
        abv: form.abv?.trim() || "42.8% V/V",
        base_rate: Number(form.base_rate),
        default_gst_percent: Number(form.default_gst_percent) || 18.0,
        is_active: form.is_active,
      };

      await productsApi.create(cleanPayload);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to register SKU in master catalog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm antialiased text-[#14120E]">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#8E7626]/30 rounded-2xl shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-[#8E7626]" />
            <h3 className="font-serif text-lg font-bold">Register SKU in Master Catalog</h3>
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
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
          {/* Row 1: SKU & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                SKU Identifier Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. TAL-12-750"
                value={form.sku_code}
                onChange={(e) => setForm({ ...form, sku_code: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs font-mono uppercase rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Commercial Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Talsons' Reserve 12 Years"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          {/* Row 2: Category & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Spirit Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Alcohol Strength (ABV)
              </label>
              <input
                type="text"
                placeholder="42.8% V/V"
                value={form.abv}
                onChange={(e) => setForm({ ...form, abv: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          {/* Row 3: Packaging Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Packaging Unit
              </label>
              <input
                type="text"
                placeholder="Cases"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Bottle Volume
              </label>
              <input
                type="text"
                placeholder="750 ml"
                value={form.bottle_volume}
                onChange={(e) => setForm({ ...form, bottle_volume: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Bottles Per Case
              </label>
              <input
                type="number"
                min="1"
                value={form.bottles_per_case}
                onChange={(e) => setForm({ ...form, bottles_per_case: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          {/* Row 4: Commercial Pricing & GST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Base Commercial Rate (INR/Unit) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                min="1"
                placeholder="3500.00"
                value={form.base_rate}
                onChange={(e) => setForm({ ...form, base_rate: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Default GST Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="18.00"
                value={form.default_gst_percent}
                onChange={(e) => setForm({ ...form, default_gst_percent: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          {/* Row 5: Notes / Description */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
              Technical Notes / Cask Profile
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Double wood matured single malt, 12 years cask aged in cellars."
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full mt-1 p-3 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#8E7626]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Register SKU</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}