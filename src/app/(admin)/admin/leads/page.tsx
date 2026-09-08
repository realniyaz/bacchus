"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Globe,
  SlidersHorizontal,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { Lead, LeadStatus, LeadTier } from "@/types/admin/lead";
import { leadsApi } from "@/services/leads";
import CreateLeadModal from "@/components/admin/modals/CreateLeadModal";
import LeadDetailDrawer from "@/components/admin/drawers/LeadDetailDrawer";

export default function LeadsDeskPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & Filter Matrix
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedModel, setSelectedModel] = useState<string>("ALL");

  // Interaction Dialog States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Load live pipeline from GET /api/v1/leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await leadsApi.list();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail || "Failed to load triage leads from FastAPI cluster."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Client-side quick filter
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lead_code?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTier = selectedTier === "ALL" || lead.tier === selectedTier;
      const matchesStatus = selectedStatus === "ALL" || lead.status === selectedStatus;
      const matchesModel = selectedModel === "ALL" || lead.commercial_model === selectedModel;

      return matchesSearch && matchesTier && matchesStatus && matchesModel;
    });
  }, [leads, searchTerm, selectedTier, selectedStatus, selectedModel]);

  // Aggregate Metrics Bar
  const stats = useMemo(() => {
    const total = leads.length;
    const hot = leads.filter((l) => l.tier === "HOT").length;
    const converted = leads.filter((l) => l.status === "CONVERTED").length;
    const negotiation = leads.filter((l) => l.status === "NEGOTIATION").length;
    return { total, hot, converted, negotiation };
  }, [leads]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* ========================================================================= */}
      {/* 1. HEADER & TRIAGE ACTIONS                                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Trade Pipeline Desk
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">
              GET /api/v1/leads
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Institutional Lead Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh Leads"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`}
            />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
              Refresh
            </span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#2A261F] shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Ingest Lead</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LIVE TELEMETRY CHIPS                                                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Total Pipeline
          </span>
          <span className="font-serif text-2xl font-bold text-[#14120E] mt-0.5 block">
            {stats.total} Leads
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            High Priority
          </span>
          <span className="font-serif text-2xl font-bold text-rose-800 mt-0.5 block">
            {stats.hot} Hot Tier
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Negotiation Stage
          </span>
          <span className="font-serif text-2xl font-bold text-[#C87A1E] mt-0.5 block">
            {stats.negotiation} Active
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Converted Accounts
          </span>
          <span className="font-serif text-2xl font-bold text-emerald-800 mt-0.5 block">
            {stats.converted} Closed
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MULTI-VARIABLE SEARCH & FILTER BAR                                     */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Keyword Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by company, liaison contact, country or BAC-LD code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        {/* Tier Selector */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Tiers</option>
            <option value="HOT">Hot Tier (70+)</option>
            <option value="WARM">Warm Tier (40-69)</option>
            <option value="COLD">Cold Tier (&lt;40)</option>
          </select>

          {/* Stage Selector */}
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

          {/* Commercial Model Selector */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Models</option>
            <option value="DISTRIBUTION">Distribution</option>
            <option value="PRIVATE_LABEL">Private Label</option>
            <option value="STATE_OWNERSHIP">State Ownership</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN DOSSIER DATA TABLE                                                */}
      {/* ========================================================================= */}
      <div className="rounded-2xl border border-[#8E7626]/30 bg-[#FAF7F2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7626]/20 bg-[#F4EFE6] text-[#7A7366] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 font-bold">Code</th>
                <th className="py-4 px-6 font-bold">Institution / Contact</th>
                <th className="py-4 px-6 font-bold">Corridor</th>
                <th className="py-4 px-6 font-bold">Commercial Engagement</th>
                <th className="py-4 px-6 font-bold">Score / Tier</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7626]/15">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366] font-sans">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#8E7626]" />
                      <span>Aggregating trade records from PostgreSQL database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#7A7366] font-sans">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Layers className="w-6 h-6 text-[#8E7626]/50" />
                      <span className="font-semibold text-sm text-[#14120E]">
                        No Ingested Leads Found
                      </span>
                      <span className="text-xs text-[#7A7366]">
                        Adjust your filter matrices or ingest a new commercial record.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setActiveLead(lead)}
                    className="hover:bg-[#EFE8DC]/50 transition-colors cursor-pointer group"
                  >
                    {/* Lead Code */}
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {lead.lead_code}
                    </td>

                    {/* Company & Liaison */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E] group-hover:text-[#8E7626] transition-colors">
                        {lead.company_name}
                      </p>
                      <p className="text-[10px] text-[#7A7366] mt-0.5">
                        {lead.contact_name} &bull; {lead.email}
                      </p>
                    </td>

                    {/* Geography */}
                    <td className="py-4 px-6 text-[#554F43]">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#8E7626] shrink-0" />
                        <span className="font-medium">
                          {lead.country} {lead.state ? `(${lead.state})` : ""}
                        </span>
                      </div>
                    </td>

                    {/* Commercial Model */}
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#EFE8DC] border border-[#8E7626]/20 text-[#554F43] font-semibold uppercase">
                        {lead.commercial_model.replace("_", " ")}
                      </span>
                    </td>

                    {/* Score & Tier */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#14120E]">
                          {lead.score}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            lead.tier === "HOT"
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : lead.tier === "WARM"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-stone-200 text-stone-700 border border-stone-300"
                          }`}
                        >
                          {lead.tier}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                          lead.status === "CONVERTED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : lead.status === "NEGOTIATION"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : lead.status === "LOST"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : "bg-[#14120E] text-[#FAF7F2]"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLead(lead);
                        }}
                        className="p-2 rounded-lg border border-[#8E7626]/20 bg-white hover:border-[#8E7626] text-[#8E7626] transition-colors cursor-pointer"
                        title="View Lead Details"
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

        {/* Table Footer Summary */}
        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Showing <strong className="text-[#14120E]">{filteredLeads.length}</strong> of{" "}
            {leads.length} total entries
          </span>
          <span className="font-mono text-[10px]">
            Bacchus CRM Engine &bull; AES-256
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL & SLIDEOUT DRAWER DIALOGS                                        */}
      {/* ========================================================================= */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchLeads}
      />

      <LeadDetailDrawer
        lead={activeLead}
        onClose={() => setActiveLead(null)}
        onUpdated={() => {
          fetchLeads();
          setActiveLead(null);
        }}
      />
    </div>
  );
}