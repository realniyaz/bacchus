"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Product } from "@/types/admin/product";
import { productsApi } from "@/services/products";

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteProductModal({ product, isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await productsApi.deleteProduct(product.id, permanent);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Delete operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm antialiased text-[#14120E]">
      <div className="relative w-full max-w-md bg-[#FAF7F2] border border-rose-300 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 text-rose-700 mb-3">
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Manage SKU Removal</h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#7A7366]">
                {product.sku_code}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#554F43] leading-relaxed mb-4">
            You are about to remove <strong>{product.name}</strong> from catalog operations. Choose whether to perform a soft deactivation or an expunging removal:
          </p>

          <div className="p-3 rounded-xl bg-white border border-[#8E7626]/20 mb-4 space-y-2 text-xs">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="delete_type"
                checked={!permanent}
                onChange={() => setPermanent(false)}
                className="mt-0.5"
              />
              <div>
                <strong className="text-[#14120E]">Soft Deactivation (Recommended)</strong>
                <p className="text-[11px] text-[#7A7366]">
                  Preserves past invoice records while hiding SKU from new consignments.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-2 cursor-pointer pt-2 border-t border-[#8E7626]/10">
              <input
                type="radio"
                name="delete_type"
                checked={permanent}
                onChange={() => setPermanent(true)}
                className="mt-0.5"
              />
              <div>
                <strong className="text-rose-700">Permanent Expunging</strong>
                <p className="text-[11px] text-[#7A7366]">
                  Completely expunges product record from the database.
                </p>
              </div>
            </label>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-[#8E7626]/20">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-rose-700 text-white hover:bg-rose-800 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{permanent ? "Expunge SKU" : "Deactivate SKU"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}