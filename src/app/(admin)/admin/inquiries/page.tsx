"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Inbox,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { Lead } from "@/types/admin/lead";
import { leadsApi } from "@/services/leads";
import LeadDetailDrawer from "@/components/admin/drawers/LeadDetailDrawer";

export default function PublicInquiriesPage() {
  const [inquiries, setInquiries] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [activeInquiry, setActiveInquiry] = useState<Lead | null>(null);

  // Load submissions from the leads cluster
  const fetchInquiries = useCallback(async () => {
    if (typeof window !== "undefined" && !localStorage.getItem("bacchus_token")) {
      setErrorMsg("Session missing or expired. Please re-authenticate at /login.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await leadsApi.list({
        limit: 100,
        offset: 0,
      });
      // Filter for web form intakes or unassigned entries
      const records = Array.isArray(data) ? data : [];
      setInquiries(records);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail ||
          "Failed to load public dispatches from Bacchus CRM cluster."
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
        item.lead_code?.toLowerCase().includes(search) ||
        item.volume_estimate?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "ALL" || item.commercial_model === selectedCategory;

      const matchesStatus =
        selectedStatus === "ALL" || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inquiries, searchTerm, selectedCategory, selectedStatus]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => i.status === "NEW").length;
    const hotCount = inquiries.filter((i) => i.tier === "HOT").length;
    const contactedCount = inquiries.filter(
      (i) => i.status === "CONTACTED" || i.status === "ASSIGNED"
    ).length;
    return { total, newCount, hotCount, contactedCount };
  }, [inquiries]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Web Portal Submissions
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">
              /contact &bull; Intake Queue
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
              Refresh Queue
            </span>
          </button>
        </div>
      </div>

      {/* Error Notice */}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Total Dispatches
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
            High Priority (Hot)
          </span>
          <span className="font-serif text-2xl font-bold text-rose-800 mt-0.5 block">
            {stats.hotCount} Flagged
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Engaged by Reps
          </span>
          <span className="font-serif text-2xl font-bold text-emerald-800 mt-0.5 block">
            {stats.contactedCount} Active
          </span>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by sender, email, tracking code, or message excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Categories</option>
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
                <th className="py-4 px-6 font-bold">Sender / Corporate Contact</th>
                <th className="py-4 px-6 font-bold">Inquiry Pathway</th>
                <th className="py-4 px-6 font-bold">Message Excerpt</th>
                <th className="py-4 px-6 font-bold">Priority</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Inspect</th>
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
                        New transmissions sent from the public /contact form will appear here.
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
                    {/* Reference Code */}
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {item.lead_code}
                    </td>

                    {/* Sender Identity */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E] group-hover:text-[#8E7626] transition-colors">
                        {item.company_name}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-[#7A7366] mt-0.5">
                        <Mail className="w-3 h-3 text-[#8E7626]" />
                        <span>{item.email}</span>
                      </div>
                    </td>

                    {/* Category / Model */}
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#EFE8DC] border border-[#8E7626]/20 text-[#554F43] font-semibold uppercase">
                        {item.commercial_model
                          ? item.commercial_model.replace(/_/g, " ")
                          : "INQUIRY"}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 max-w-xs truncate text-[#554F43]">
                      <span className="italic">
                        "{item.volume_estimate || "No dispatch specifications provided."}"
                      </span>
                    </td>

                    {/* Score / Tier */}
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

                    {/* Inspect Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveInquiry(item);
                        }}
                        className="p-2 rounded-lg border border-[#8E7626]/20 bg-white hover:border-[#8E7626] text-[#8E7626] transition-colors cursor-pointer"
                        title="Inspect Dispatch Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Showing <strong className="text-[#14120E]">{filteredInquiries.length}</strong> of{" "}
            {inquiries.length} submissions
          </span>
          <span className="font-mono text-[10px]">
            Public Intake Queue &bull; Direct Lead Sync
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
    </div>
  );
}