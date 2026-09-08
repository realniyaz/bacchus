"use client";

import React, { useState, useEffect } from "react";
import { X, Building2, Globe, FileText, UserCheck, Loader2, Save, Trash2, AlertTriangle } from "lucide-react";
import { Customer, CustomerUpdatePayload } from "@/types/admin/customer";
import { customersApi } from "@/services/customers";

interface Props {
  customer: Customer | null;
  onClose: () => void;
  onUpdated: () => void;
  onDeleteRequested: (customer: Customer) => void;
}

export default function CustomerDetailDrawer({ customer, onClose, onUpdated, onDeleteRequested }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CustomerUpdatePayload>({
    company_name: "",
    tax_identifier: "",
    country: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        company_name: customer.company_name,
        tax_identifier: customer.tax_identifier || "",
        country: customer.country,
      });
      setIsEditing(false);
      setError(null);
    }
  }, [customer]);

  if (!customer) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await customersApi.update(customer.id, {
        company_name: form.company_name?.trim(),
        tax_identifier: form.tax_identifier?.trim() || undefined,
        country: form.country?.trim(),
      });
      setIsEditing(false);
      onUpdated();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update institutional customer.");
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
              {customer.customer_code}
            </span>
            <h3 className="font-serif text-xl font-bold mt-0.5">{customer.company_name}</h3>
          </div>
          <button onClick={onClose} className="text-[#7A7366] hover:text-[#14120E] transition-colors cursor-pointer">
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
              {/* Account Card */}
              <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#8E7626]/20 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366] block">
                  Institutional Dossier
                </span>
                <p className="font-serif text-2xl font-bold text-[#14120E]">{customer.company_name}</p>
                <div className="flex items-center gap-2 text-xs text-[#554F43]">
                  <Globe className="w-3.5 h-3.5 text-[#8E7626]" />
                  <span>{customer.country}</span>
                </div>
              </div>

              {/* Legal & Account Info */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                  Trade Registration &amp; Tax Specs
                </h4>
                <div className="space-y-2.5 text-xs bg-white/70 p-4 rounded-xl border border-[#8E7626]/15">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A7366]">Tax Identifier / GST / VAT</span>
                    <span className="font-mono font-bold text-[#14120E]">
                      {customer.tax_identifier || "NOT SPECIFIED"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#8E7626]/10 pt-2">
                    <span className="text-[#7A7366]">Account Manager Clearance</span>
                    <span className="font-mono text-[#554F43] truncate max-w-[180px]">
                      {customer.account_manager_id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider hover:bg-[#2A261F] transition-all cursor-pointer"
                >
                  Edit Account Details
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteRequested(customer)}
                  className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  title="Run Delete Sequence"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                  Tax Identifier (GST / VAT / EIN)
                </label>
                <input
                  type="text"
                  value={form.tax_identifier || ""}
                  onChange={(e) => setForm({ ...form, tax_identifier: e.target.value })}
                  placeholder="e.g. 03AABCC1234F1ZP or VAT-8849201"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none focus:border-[#8E7626]"
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
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#8E7626]/20 bg-[#F4EFE6] text-[10px] font-mono text-[#7A7366] flex justify-between items-center">
        <span>UUID: {customer.id}</span>
        <span>Onboarded: {new Date(customer.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}