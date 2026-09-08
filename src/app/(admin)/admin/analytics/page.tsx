"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart3,
  TrendingUp,
  RefreshCw,
  Globe2,
  PieChart,
  Download,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  Receipt,
  Users,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import axios from "axios";

interface LeadItem {
  id: string;
  country: string;
  commercial_model: string;
  tier: "HOT" | "WARM" | "COLD";
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "NEGOTIATION" | "CONVERTED" | "LOST";
  created_at: string;
}

interface InvoiceItem {
  id: string;
  invoice_number: string;
  currency: string;
  total_amount: number | string;
  tax_amount: number | string;
  status: "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "VOID";
  supply_country: string;
  place_of_supply: string;
  created_at: string;
}

interface ConversionItem {
  id: string;
  lead_id: string;
  deal_value: number;
  commercial_model: string;
  created_at: string;
}

interface ProductItem {
  id: string;
  sku_code: string;
  name: string;
  category: string;
  base_rate: number | string;
}

export default function TradeAnalyticsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [conversions, setConversions] = useState<ConversionItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"ALL" | "30D" | "90D">("ALL");

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const [leadsRes, invoicesRes, convRes, prodRes] = await Promise.allSettled([
        axios.get(`${apiUrl}/leads?limit=500`, { headers }),
        axios.get(`${apiUrl}/invoices?limit=500`, { headers }),
        axios.get(`${apiUrl}/conversions`, { headers }),
        axios.get(`${apiUrl}/products`, { headers }),
      ]);

      if (leadsRes.status === "fulfilled") setLeads(leadsRes.value.data || []);
      if (invoicesRes.status === "fulfilled") setInvoices(invoicesRes.value.data || []);
      if (convRes.status === "fulfilled") setConversions(convRes.value.data || []);
      if (prodRes.status === "fulfilled") setProducts(prodRes.value.data || []);
    } catch {
      setErrorMsg("Failed to pull operational analytical telemetry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Aggregate Primary Telemetry
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const convertedLeads = leads.filter((l) => l.status === "CONVERTED").length;
    const lostLeads = leads.filter((l) => l.status === "LOST").length;
    const activeNegotiations = leads.filter((l) => l.status === "NEGOTIATION").length;

    const winRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

    const totalInvoiced = invoices.reduce((acc, inv) => {
      return inv.status !== "VOID" ? acc + Number(inv.total_amount || 0) : acc;
    }, 0);

    const totalTaxCollected = invoices.reduce((acc, inv) => {
      return inv.status !== "VOID" ? acc + Number(inv.tax_amount || 0) : acc;
    }, 0);

    const totalContractedVal = conversions.reduce((acc, c) => acc + Number(c.deal_value || 0), 0);

    return {
      totalLeads,
      convertedLeads,
      lostLeads,
      activeNegotiations,
      winRate,
      totalInvoiced,
      totalTaxCollected,
      totalContractedVal,
    };
  }, [leads, invoices, conversions]);

  // Commercial Engagement Breakdown
  const modelBreakdown = useMemo(() => {
    const total = leads.length || 1;
    const models = [
      { key: "DISTRIBUTION", label: "Distribution Partner Program", color: "#8E7626" },
      { key: "PRIVATE_LABEL", label: "Bespoke Private Labelling", color: "#B8860B" },
      { key: "STATE_OWNERSHIP", label: "Domestic State Investments", color: "#14120E" },
    ];

    return models.map((m) => {
      const count = leads.filter((l) => l.commercial_model === m.key).length;
      const percentage = Math.round((count / total) * 100);
      return { ...m, count, percentage };
    });
  }, [leads]);

  // Corridor Geographic Distribution
  const corridorDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      const country = l.country ? l.country.trim() : "Unassigned";
      map[country] = (map[country] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({
        country,
        count,
        percent: Math.round((count / (leads.length || 1)) * 100),
      }));
  }, [leads]);

  // Export Analytics to CSV
  const exportCsv = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Ingested Leads", stats.totalLeads],
      ["Converted Institutional Accounts", stats.convertedLeads],
      ["Lead-to-Customer Win Rate", `${stats.winRate}%`],
      ["Total Invoiced Gross Value (INR)", stats.totalInvoiced],
      ["Statutory Tax/IGST Collected (INR)", stats.totalTaxCollected],
      ["Contracted Deal Pipeline (INR)", stats.totalContractedVal],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bacchus_trade_analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Trade Intelligence &amp; Performance
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">19 Trade Corridors</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Executive Analytics Desk
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50 font-medium"
            title="Recalculate Metrics"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`}
            />
            <span className="text-xs uppercase tracking-wider hidden sm:inline">Refresh Data</span>
          </button>

          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider hover:bg-[#2A261F] shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Macro Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Win Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              {stats.winRate}%
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
              {stats.convertedLeads} Won
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Out of {stats.totalLeads} qualified triage leads
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Invoiced Consignment Total
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              ₹{(stats.totalInvoiced / 100000).toFixed(1)}L
            </p>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE8DC] border border-[#8E7626]/30 text-[#8E7626] font-bold">
              {invoices.length} Bills
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Domestic and international dispatch billing
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Tax &amp; IGST Remittance
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              ₹{(stats.totalTaxCollected / 100000).toFixed(1)}L
            </p>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Compliant</span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Remitted under central excise frameworks
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A7366] font-semibold">
              Sealed Contract Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/20 flex items-center justify-center text-[#8E7626]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="font-serif text-3xl sm:text-4xl text-[#14120E] font-bold">
              ₹{(stats.totalContractedVal / 100000).toFixed(1)}L
            </p>
            <span className="text-[10px] font-mono text-[#8E7626] font-bold">
              {conversions.length} Deals
            </span>
          </div>
          <p className="text-[10px] text-[#7A7366] mt-2">
            Locked institutional customer agreements
          </p>
        </div>
      </div>

      {/* 3. Deep Breakdowns (Funnel & Models) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Commercial Engagement Mix (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20">
            <div>
              <h2 className="font-serif text-xl text-[#14120E] tracking-wide font-bold">
                Engagement Model Velocity
              </h2>
              <p className="text-xs text-[#7A7366] mt-0.5">
                Lead demand split across B2B operational channels
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#8E7626] font-bold uppercase tracking-wider">
              Channel Volume
            </span>
          </div>

          <div className="space-y-5">
            {modelBreakdown.map((m) => (
              <div key={m.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#14120E] font-semibold">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#14120E] font-bold">{m.count} Leads</span>
                    <span className="text-[10px] font-mono text-[#7A7366]">({m.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-[#EFE8DC] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${m.percentage}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#EFE8DC]/70 border border-[#8E7626]/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-[#554F43] font-medium">
                Active Master Catalog: {products.length} Formulated Spirit SKUs Ready
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#7A7366] font-bold">PORT: 8000</span>
          </div>
        </div>

        {/* Right: Top Geographic Trade Hubs (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20">
            <div>
              <h2 className="font-serif text-xl text-[#14120E] tracking-wide font-bold">
                Top Demand Corridors
              </h2>
              <p className="text-xs text-[#7A7366] mt-0.5">
                Highest concentration of trade volume inquiries
              </p>
            </div>
            <Globe2 className="w-5 h-5 text-[#8E7626]" />
          </div>

          <div className="divide-y divide-[#8E7626]/15">
            {corridorDistribution.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#7A7366]">
                No geographic data collected yet.
              </div>
            ) : (
              corridorDistribution.map((corridor, idx) => (
                <div
                  key={corridor.country}
                  className="py-3.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-[#8E7626] w-4">
                      0{idx + 1}
                    </span>
                    <span className="font-semibold text-[#14120E]">{corridor.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#14120E]">
                      {corridor.count} leads
                    </span>
                    <span className="text-[10px] font-mono text-[#7A7366]">
                      ({corridor.percent}%)
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 text-[11px] text-[#7A7366] leading-relaxed border-t border-[#8E7626]/20">
            Trade logistics optimized across East Africa (Tanzania Hub), UAE Free Zone, Europe, and domestic bonded depots.
          </div>
        </div>
      </div>
    </div>
  );
}