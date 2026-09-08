"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Receipt,
  ArrowUpRight,
  Clock,
  Sparkles,
  RefreshCw,
  Globe2,
  Calendar,
  Layers,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";

interface LeadItem {
  id: string;
  lead_code: string;
  company_name: string;
  country: string;
  commercial_model: string;
  tier: "HOT" | "WARM" | "COLD";
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "NEGOTIATION" | "CONVERTED" | "LOST";
  created_at: string;
}

interface FollowUpItem {
  id: string;
  lead_id: string;
  scheduled_at: string;
  type: string;
  status: "PENDING" | "COMPLETED" | "OVERDUE" | "CANCELLED";
  notes?: string;
}

interface CustomerItem {
  id: string;
  customer_code: string;
  company_name: string;
  country: string;
}

interface InvoiceItem {
  id: string;
  invoice_number: string;
  currency: string;
  total_amount: number | string;
  status: "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "VOID";
  created_at: string;
}

interface ProductItem {
  id: string;
  sku_code: string;
  name: string;
}

interface AuditLogItem {
  id: string;
  user_email: string | null;
  method: string;
  endpoint: string;
  status_code: number;
  timestamp: string;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>([]);
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string>("Initializing...");

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setSyncError(null);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const [
        leadsRes,
        followUpsRes,
        customersRes,
        invoicesRes,
        productsRes,
        auditLogsRes,
      ] = await Promise.allSettled([
        axios.get(`${apiUrl}/leads?limit=100`, { headers }),
        axios.get(`${apiUrl}/follow-ups`, { headers }),
        axios.get(`${apiUrl}/customers?limit=100`, { headers }),
        axios.get(`${apiUrl}/invoices?limit=100`, { headers }),
        axios.get(`${apiUrl}/products`, { headers }),
        axios.get(`${apiUrl}/audit-logs?limit=10`, { headers }),
      ]);

      if (leadsRes.status === "fulfilled") setLeads(leadsRes.value.data || []);
      if (followUpsRes.status === "fulfilled") setFollowUps(followUpsRes.value.data || []);
      if (customersRes.status === "fulfilled") setCustomers(customersRes.value.data || []);
      if (invoicesRes.status === "fulfilled") setInvoices(invoicesRes.value.data || []);
      if (productsRes.status === "fulfilled") setProducts(productsRes.value.data || []);
      if (auditLogsRes.status === "fulfilled") setAuditLogs(auditLogsRes.value.data || []);

      setLastSync(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      setSyncError("Network error while aggregating trade records.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const hotLeads = leads.filter((l) => l.tier === "HOT").length;
    const convertedLeads = leads.filter((l) => l.status === "CONVERTED").length;

    const winRate =
      totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

    const pendingFollowUps = followUps.filter(
      (f) => f.status === "PENDING"
    ).length;

    const now = new Date();
    const overdueFollowUps = followUps.filter(
      (f) => f.status === "PENDING" && new Date(f.scheduled_at) < now
    ).length;

    const totalInvoiceValue = invoices.reduce((acc, inv) => {
      if (inv.status !== "VOID") {
        return acc + Number(inv.total_amount || 0);
      }
      return acc;
    }, 0);

    return {
      totalLeads,
      hotLeads,
      activeAccounts: customers.length,
      winRate,
      pendingFollowUps,
      overdueFollowUps,
      totalInvoiceValue,
      catalogCount: products.length,
    };
  }, [leads, followUps, customers, invoices, products]);

  const funnelStages = useMemo(() => {
    const total = leads.length || 1;
    const stages = [
      { label: "New Ingestion", status: "NEW", color: "#8E7626" },
      { label: "Assigned & Contacted", status: "CONTACTED", color: "#B8860B" },
      { label: "Negotiation", status: "NEGOTIATION", color: "#C87A1E" },
      { label: "Converted Account", status: "CONVERTED", color: "#14120E" },
    ];

    return stages.map((st) => {
      const count = leads.filter((l) => l.status === st.status).length;
      const percentage = Math.round((count / total) * 100);
      return {
        ...st,
        count,
        percentage,
      };
    });
  }, [leads]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#14120E]">
      {/* HEADER & REFRESH CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Live Aggregate Telemetry
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-[#8E7626]" /> Synced: {lastSync}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide">
            Executive Operations Desk
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/30 text-xs uppercase tracking-[0.16em] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50 font-medium"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isLoading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"
              }`}
            />
            <span>Refresh State</span>
          </button>

          <Link
            href="/admin/leads"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#2A261F] shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Triage Leads</span>
          </Link>
        </div>
      </div>

      {syncError && (
        <div className="p-4 rounded-xl bg-[#B51F24]/10 border border-[#B51F24]/30 flex items-center gap-3 text-xs text-[#84191D]">
          <AlertCircle className="w-4 h-4 text-[#B51F24] shrink-0" />
          <span className="font-medium">{syncError}</span>
        </div>
      )}

      {/* KPI TILES (LIGHT PALETTE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Ingested Leads */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Ingested Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              {metrics.totalLeads}
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE8DC] border border-[#8E7626]/30 text-[#8E7626] font-bold">
              {metrics.hotLeads} Hot Tier
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Dynamic distribution via <code className="text-[#14120E] font-mono">/api/v1/leads</code>
          </p>
        </motion.div>

        {/* Metric 2: Institutional Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Institutions
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              {metrics.activeAccounts}
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
              {metrics.winRate}% Win Rate
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Active Accounts via <code className="text-[#14120E] font-mono">/api/v1/customers</code>
          </p>
        </motion.div>

        {/* Metric 3: Follow-Up Agenda */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Follow-Up Agenda
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              {metrics.pendingFollowUps}
            </p>
            {metrics.overdueFollowUps > 0 ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 border border-rose-300 text-rose-800 font-bold">
                {metrics.overdueFollowUps} Overdue
              </span>
            ) : (
              <span className="text-[10px] font-mono text-emerald-700 font-bold">On Track</span>
            )}
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Calendar items via <code className="text-[#14120E] font-mono">/api/v1/follow-ups</code>
          </p>
        </motion.div>

        {/* Metric 4: Billed Trade Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Billed Trade Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              ₹{(metrics.totalInvoiceValue / 100000).toFixed(1)}L
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE8DC] border border-[#8E7626]/30 text-[#8E7626] font-bold">
              {invoices.length} Bills
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Consignment bills via <code className="text-[#14120E] font-mono">/api/v1/invoices</code>
          </p>
        </motion.div>
      </div>

      {/* PIPELINE & ACTION LAUNCHPAD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Funnel Stage Distribution (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20">
            <div>
              <h2 className="font-serif text-xl text-[#14120E] tracking-wide font-bold">
                Computed Commercial Pipeline
              </h2>
              <p className="text-xs text-[#7A7366] mt-0.5">
                Dynamic conversion transition counts aggregated from <code className="text-[#14120E] font-mono">/leads</code>
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#8E7626] hover:text-[#14120E] font-bold flex items-center gap-1 uppercase tracking-wider transition-colors"
            >
              <span>View Table</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {funnelStages.map((stage) => (
              <div key={stage.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#554F43] font-semibold">{stage.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#14120E] font-bold">{stage.count} Leads</span>
                    <span className="text-[10px] font-mono text-[#7A7366]">
                      ({stage.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#EFE8DC] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-[#554F43] font-medium">
                FastAPI Endpoints Active: Leads, Follow-Ups, Invoicing, Customers
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#7A7366] font-bold">PORT: 8000</span>
          </div>
        </div>

        {/* Quick Operations & SKU Catalog Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-4">
            <h3 className="font-serif text-lg text-[#14120E] tracking-wide font-bold">
              Quick Desks
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/leads"
                className="p-3.5 rounded-xl bg-[#EFE8DC]/60 border border-[#8E7626]/20 hover:border-[#8E7626] hover:bg-[#EFE8DC] text-left transition-all group"
              >
                <Users className="w-4 h-4 text-[#8E7626] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-[#14120E]">Ingest Lead</p>
                <p className="text-[10px] text-[#7A7366] mt-0.5">POST /leads</p>
              </Link>

              <Link
                href="/admin/invoices"
                className="p-3.5 rounded-xl bg-[#EFE8DC]/60 border border-[#8E7626]/20 hover:border-[#8E7626] hover:bg-[#EFE8DC] text-left transition-all group"
              >
                <Receipt className="w-4 h-4 text-[#8E7626] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-[#14120E]">Draft Invoice</p>
                <p className="text-[10px] text-[#7A7366] mt-0.5">POST /invoices</p>
              </Link>

              <Link
                href="/admin/customers"
                className="p-3.5 rounded-xl bg-[#EFE8DC]/60 border border-[#8E7626]/20 hover:border-[#8E7626] hover:bg-[#EFE8DC] text-left transition-all group"
              >
                <Building2 className="w-4 h-4 text-[#8E7626] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-[#14120E]">Customers</p>
                <p className="text-[10px] text-[#7A7366] mt-0.5">GET /customers</p>
              </Link>

              <Link
                href="/admin/settings"
                className="p-3.5 rounded-xl bg-[#EFE8DC]/60 border border-[#8E7626]/20 hover:border-[#8E7626] hover:bg-[#EFE8DC] text-left transition-all group"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#8E7626] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-[#14120E]">Audit Trail</p>
                <p className="text-[10px] text-[#7A7366] mt-0.5">GET /audit-logs</p>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#EFE8DC]/80 border border-[#8E7626]/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8E7626] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Active SKUs in Master Catalog
              </span>
              <span className="font-mono text-[#14120E] font-bold">
                {metrics.catalogCount} Available
              </span>
            </div>
            <p className="text-xs text-[#554F43] leading-relaxed">
              Dynamically loaded via <code className="text-[#14120E] font-semibold">/api/v1/products</code>. Line items populate directly with base rates and GST settings during invoice dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* AUDIT LOG INTERCEPTOR STREAM */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#14120E] font-bold">Recent System Audit Trail</h3>
              <p className="text-xs text-[#7A7366]">
                Mutating requests captured directly from <code className="text-[#8E7626] font-mono">/api/v1/audit-logs</code>
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#7A7366] uppercase tracking-wider font-semibold">
            Live Interceptor Stream
          </span>
        </div>

        {auditLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#7A7366]">
            No recent audit events captured yet.
          </div>
        ) : (
          <div className="divide-y divide-[#8E7626]/10">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#EFE8DC]/50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      log.method === "POST"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : log.method === "PATCH"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : log.method === "DELETE"
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    {log.method}
                  </span>
                  <span className="font-mono text-[#14120E] font-medium">{log.endpoint}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-[#7A7366] pl-2 sm:pl-0 font-mono">
                  <span>{log.user_email || "System/Public"}</span>
                  <span>•</span>
                  <span>HTTP {log.status_code}</span>
                  <span>•</span>
                  <span>
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}