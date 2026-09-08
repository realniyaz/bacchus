"use client";

import React, { useState } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import { CommercialModel, LeadCreatePayload } from "@/types/admin/lead";
import { leadsApi } from "@/services/leads";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateLeadModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<LeadCreatePayload>({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    commercial_model: "DISTRIBUTION",
    volume_estimate: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cleanPayload: LeadCreatePayload = {
        company_name: form.company_name.trim(),
        contact_name: form.contact_name.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        commercial_model: form.commercial_model,
        phone: form.phone?.trim() ? form.phone.trim() : undefined,
        state: form.state?.trim() ? form.state.trim() : undefined,
        volume_estimate: form.volume_estimate?.trim()
          ? form.volume_estimate.trim()
          : undefined,
      };

      await leadsApi.create(cleanPayload);
      onSuccess();
      onClose();
    } catch (err: any) {
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          setError(
            err.response.data.detail
              .map((d: any) => `${d.loc?.slice(-1)[0]}: ${d.msg}`)
              .join(" | ")
          );
        } else {
          setError(String(err.response.data.detail));
        }
      } else {
        setError("Failed to ingest lead record. Verify backend connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#8E7626]/30 rounded-2xl shadow-xl overflow-hidden text-[#14120E]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8E7626]" />
            <h3 className="font-serif text-lg font-bold">Ingest Trade Lead</h3>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="Apex Wholesale Importers"
                value={form.company_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, company_name: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Contact Liaison *
              </label>
              <input
                type="text"
                required
                placeholder="James Sterling"
                value={form.contact_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, contact_name: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Official Email *
              </label>
              <input
                type="email"
                required
                placeholder="trade@apeximports.co.uk"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Direct Phone
              </label>
              <input
                type="text"
                placeholder="+44 7911 123456"
                value={form.phone || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Country *
              </label>
              <input
                type="text"
                required
                placeholder="United Kingdom"
                value={form.country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, country: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                State / Region
              </label>
              <input
                type="text"
                placeholder="London Greater Area"
                value={form.state || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, state: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Commercial Model *
              </label>
              <select
                value={form.commercial_model}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setForm({
                    ...form,
                    commercial_model: e.target.value as CommercialModel,
                  })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              >
                <option value="DISTRIBUTION">Global Brand Distribution</option>
                <option value="PRIVATE_LABEL">Turnkey Private Labelling</option>
                <option value="STATE_OWNERSHIP">Statewise Brand Ownership</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Volume Projections
              </label>
              <input
                type="text"
                placeholder="e.g. 6 Containers per month"
                value={form.volume_estimate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, volume_estimate: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-[#FFFFFF] focus:outline-none focus:border-[#8E7626]"
              />
            </div>
          </div>

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
              <span>Commit Ingestion</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}