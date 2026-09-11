"use client";

import React, { useState } from "react";
import { AlertTriangle, Loader2, X, Trash2 } from "lucide-react";
import { Lead } from "@/types/admin/lead";
import { inquiriesApi } from "@/services/inquiries";

interface Props {
  inquiry: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteInquiryModal({
  inquiry,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !inquiry) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await inquiriesApi.deleteInquiry(inquiry.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Delete operation failed. Please retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm antialiased text-[#14120E]">
      <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#8E7626]/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-2.5 text-rose-800">
            <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#14120E]">
                Expunge Inbound Inquiry
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#8E7626] font-bold">
                {inquiry.lead_code}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#7A7366] hover:text-[#14120E] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#554F43] leading-relaxed">
            Are you sure you want to permanently remove the inquiry from{" "}
            <strong className="text-[#14120E]">{inquiry.company_name}</strong>?
            This will expunge all recorded messages, activity timeline notes, and contact logs from the system ledger.
          </p>

          <div className="p-3.5 rounded-xl bg-[#EFE8DC]/80 border border-[#8E7626]/20 text-xs space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#7A7366]">Sender:</span>
              <span className="font-bold text-[#14120E]">{inquiry.contact_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7366]">Email:</span>
              <span className="text-[#14120E]">{inquiry.email}</span>
            </div>
            {inquiry.phone && (
              <div className="flex justify-between">
                <span className="text-[#7A7366]">Phone:</span>
                <span className="text-[#14120E]">{inquiry.phone}</span>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#8E7626]/20">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-rose-700 text-white hover:bg-rose-800 flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              <span>Expunge Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}