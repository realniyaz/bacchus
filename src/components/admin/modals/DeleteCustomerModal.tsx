"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Customer } from "@/types/admin/customer";
import { customersApi } from "@/services/customers";

interface Props {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteCustomerModal({ customer, isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !customer) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await customersApi.deleteSequence(customer.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Delete sequence blocked. Customer may hold active invoices.");
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
              <h3 className="font-serif text-lg font-bold">Delete Customer Sequence</h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#7A7366]">
                {customer.customer_code}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#554F43] leading-relaxed mb-4">
            Are you sure you want to delete <strong>{customer.company_name}</strong>? 
            Executing this sequence will remove the account registration, detach the conversion agreement, and automatically revert the origin lead back to <strong>NEGOTIATION</strong> stage.
          </p>

          {error && (
            <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#8E7626]/20">
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
              <span>Execute Deletion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}