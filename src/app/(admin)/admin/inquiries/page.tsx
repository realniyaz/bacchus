"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Inbox,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  Mail,
  Phone,
  Trash2,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Lead } from "@/types/admin/lead";
import { leadsApi } from "@/services/leads";
import LeadDetailDrawer from "@/components/admin/drawers/LeadDetailDrawer";
import DeleteInquiryModal from "@/components/admin/modals/DeleteInquiryModal";

export default function PublicInquiriesPage() {
  const [inquiries, setInquiries] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Drawer and Modal State
  const [activeInquiry, setActiveInquiry] = useState<Lead | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<Lead | null>(null);

  // Fetch all leads from the API
  const fetchInquiries = useCallback(async () => {
    if (typeof window !== "undefined" && !localStorage.getItem("bacchus_token")) {
      setErrorMsg("Session missing or expired. Please re-authenticate at /login.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await leadsApi.list({ limit: 100, offset: 0 });
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail || "Failed to load dispatches from operations gateway."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Client-side quick filter
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        item.company_name?.toLowerCase().includes(search) ||
        item.contact_name?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        (item.phone && item.phone.toLowerCase().includes(search)) ||
        item.lead_code?.toLowerCase().includes(search) ||
        item.volume_estimate?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "ALL" || item.commercial_model === selectedCategory;

      const matchesStatus =
        selectedStatus === "ALL" || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inquiries, searchTerm, selectedCategory, selectedStatus]);

  // Telemetry Aggregates
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "NEW").length;
    const hotCount = inquiries.filter((i) => i.tier === "HOT").length;
    return { total, newCount, hotCount };
  }, [inquiries]);

  const handleDeleteClick = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    setInquiryToDelete(lead);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header & Live Telemetry Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Web Portal Intake
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">
              /contact Queue &bull; Direct Sync
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Public Inquiries &amp; Dispatches
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh Inbound Queue"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"
              }`}
            />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
              Refresh Desk
            </span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={fetchInquiries}
            className="underline font-semibold hover:text-rose-900 cursor-pointer ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. Telemetry Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Total Inbound Dispatches
          </span>
          <span className="font-serif text-2xl font-bold text-[#14120E] mt-0.5 block">
            {stats.total}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Pending Triage (New)
          </span>
          <span className="font-serif text-2xl font-bold text-[#8E7626] mt-0.5 block">
            {stats.newCount} Unassigned
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            High Priority Flagged
          </span>
          <span className="font-serif text-2xl font-bold text-rose-800 mt-0.5 block">
            {stats.hotCount} Hot Tier
          </span>
        </div>
      </div>

      {/* 3. Search & Category Filters */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by sender, email, phone number, tracking code, or excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Models</option>
            <option value="DISTRIBUTION">Distribution</option>
            <option value="PRIVATE_LABEL">Private Label</option>
            <option value="STATE_OWNERSHIP">State Ownership</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="NEGOTIATION">NEGOTIATION</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
      </div>

      {/* 4. Ledger Data Table */}
      <div className="rounded-2xl border border-[#8E7626]/30 bg-[#FAF7F2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7626]/20 bg-[#F4EFE6] text-[#7A7366] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 font-bold">Reference</th>
                <th className="py-4 px-6 font-bold">Sender &amp; Coordinates</th>
                <th className="py-4 px-6 font-bold">Pathway</th>
                <th className="py-4 px-6 font-bold">Message Excerpt</th>
                <th className="py-4 px-6 font-bold">Tier</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7626]/15">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#8E7626]" />
                      <span>Loading inbound dispatches...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="w-7 h-7 text-[#8E7626]/50" />
                      <span className="font-semibold text-sm text-[#14120E]">
                        No Inbound Inquiries Found
                      </span>
                      <span className="text-xs text-[#7A7366]">
                        Transmissions sent from the public /contact form will populate here.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setActiveInquiry(item)}
                    className="hover:bg-[#EFE8DC]/50 transition-colors cursor-pointer group"
                  >
                    {/* Reference */}
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {item.lead_code}
                    </td>

                    {/* Sender Identity & Phone/Email */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E] group-hover:text-[#8E7626] transition-colors">
                        {item.company_name}
                      </p>
                      <div className="flex flex-col gap-0.5 text-[11px] text-[#7A7366] mt-0.5">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[#8E7626]" />
                          <span>{item.email}</span>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-1 font-mono text-[#554F43]">
                            <Phone className="w-3 h-3 text-[#8E7626]" />
                            <span>{item.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Pathway / Commercial Model */}
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE8DC] border border-[#8E7626]/20 text-[#554F43] font-semibold">
                        {item.commercial_model
                          ? item.commercial_model.replace(/_/g, " ")
                          : "DISTRIBUTION"}
                      </span>
                    </td>

                    {/* Message Excerpt */}
                    <td className="py-4 px-6 max-w-xs truncate text-[#554F43]">
                      <span className="italic">
                        "{item.volume_estimate || "No dispatch specifications provided."}"
                      </span>
                    </td>

                    {/* Priority Tier */}
                    <td className="py-4 px-6">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          item.tier === "HOT"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : item.tier === "WARM"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-stone-200 text-stone-700 border border-stone-300"
                        }`}
                      >
                        {item.tier}
                      </span>
                    </td>

                    {/* Workflow Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                          item.status === "NEW"
                            ? "bg-[#14120E] text-[#FAF7F2]"
                            : item.status === "CONVERTED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : item.status === "NEGOTIATION"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-[#EFE8DC] text-[#554F43] border border-[#8E7626]/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions: View Drawer & Expunge Modal */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveInquiry(item);
                          }}
                          className="p-2 rounded-lg border border-[#8E7626]/20 bg-white hover:border-[#8E7626] text-[#8E7626] transition-colors cursor-pointer"
                          title="Inspect Lead Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteClick(e, item)}
                          className="p-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                          title="Expunge Inquiry"
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

        {/* Ledger Footer */}
        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Showing <strong className="text-[#14120E]">{filteredInquiries.length}</strong> of{" "}
            {inquiries.length} dispatches
          </span>
          <span className="font-mono text-[10px]">
            Public Intake Desk &bull; Lead Ledger Synchronized
          </span>
        </div>
      </div>

      {/* Slideout Detail Drawer */}
      <LeadDetailDrawer
        lead={activeInquiry}
        onClose={() => setActiveInquiry(null)}
        onUpdated={() => {
          fetchInquiries();
          setActiveInquiry(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteInquiryModal
        isOpen={!!inquiryToDelete}
        inquiry={inquiryToDelete}
        onClose={() => setInquiryToDelete(null)}
        onSuccess={() => {
          fetchInquiries();
          setInquiryToDelete(null);
        }}
      />
    </div>
  );
}