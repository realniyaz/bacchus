"use client";

import React, { useState } from "react";
import { X, Loader2, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { Lead } from "@/types/admin/lead";
import { crmApi } from "@/services/crm";

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConvertCustomerModal({ lead, isOpen, onClose, onSuccess }: Props) {
  const [dealValue, setDealValue] = useState<number>(250000);
  const [taxIdentifier, setTaxIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !lead) return null;

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await crmApi.convertLead({
        lead_id: lead.id,
        deal_value: Number(dealValue),
        commercial_model: lead.commercial_model,
        tax_identifier: taxIdentifier.trim() || undefined,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Lead conversion sequence failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm antialiased text-[#14120E]">
      <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#8E7626]/40 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8E7626]" />
            <h3 className="font-serif text-lg font-bold">Convert to Customer Account</h3>
          </div>
          <button onClick={onClose} className="text-[#7A7366] hover:text-[#14120E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-100 border border-rose-300 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleConvert} className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-[#EFE8DC]/80 border border-[#8E7626]/20 text-xs space-y-1">
            <p className="font-bold text-[#14120E]">{lead.company_name}</p>
            <p className="text-[#7A7366]">Model: {lead.commercial_model.replace("_", " ")}</p>
            <p className="text-[#7A7366]">Jurisdiction: {lead.country}</p>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
              Contract Deal Value (INR) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="1000"
              value={dealValue}
              onChange={(e) => setDealValue(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
              Tax Identifier / GST / VAT
            </label>
            <input
              type="text"
              placeholder="e.g. 03AABCC1234F1ZP"
              value={taxIdentifier}
              onChange={(e) => setTaxIdentifier(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#8E7626]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
              <span>Execute Conversion</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}