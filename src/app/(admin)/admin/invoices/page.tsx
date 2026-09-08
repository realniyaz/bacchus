"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Receipt,
  Search,
  RefreshCw,
  Plus,
  Eye,
  FileText,
  Printer,
  Trash2,
  AlertCircle,
  Clock,
  Building2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Invoice, PaymentStatus } from "@/types/admin/invoice";
import { invoicesApi } from "@/services/invoices";
import CreateInvoiceDrawer from "@/components/admin/drawers/CreateInvoiceDrawer";

export default function InvoicesLedgerPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await invoicesApi.list();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail || "Failed to load consignment bills from backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleStatusTransition = async (invoiceId: string, nextStatus: PaymentStatus) => {
    try {
      await invoicesApi.updateStatus(invoiceId, nextStatus);
      fetchInvoices();
    } catch {
      alert("Failed to update payment status.");
    }
  };

  const handleVoidOrDelete = async (invoiceId: string) => {
    if (!confirm("Are you sure you want to mark this invoice as VOID?")) return;
    try {
      await invoicesApi.voidOrDelete(invoiceId, false);
      fetchInvoices();
    } catch {
      alert("Action failed.");
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        inv.invoice_number.toLowerCase().includes(search) ||
        inv.billed_to_snapshot?.name?.toLowerCase().includes(search) ||
        inv.place_of_supply?.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "ALL" || inv.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, selectedStatus]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalBilled = invoices.reduce((acc, inv) => {
      return inv.status !== "VOID" ? acc + Number(inv.total_amount || 0) : acc;
    }, 0);

    const paidCount = invoices.filter((i) => i.status === "PAID").length;
    const issuedCount = invoices.filter((i) => i.status === "ISSUED").length;
    const overdueCount = invoices.filter((i) => i.status === "OVERDUE").length;

    return { totalBilled, paidCount, issuedCount, overdueCount };
  }, [invoices]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Trade Billing &amp; Excise Engine
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">
              GET /api/v1/invoices
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Consignment Tax Invoices
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInvoices}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh Ledger"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`}
            />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
              Refresh
            </span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#2A261F] shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Generate Bill</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Telemetry Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Billed Volume
          </span>
          <span className="font-serif text-2xl font-bold text-[#14120E] mt-0.5 block">
            ₹{(metrics.totalBilled / 100000).toFixed(1)}L
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Issued Consignments
          </span>
          <span className="font-serif text-2xl font-bold text-[#8E7626] mt-0.5 block">
            {metrics.issuedCount} Active
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Settled (Paid)
          </span>
          <span className="font-serif text-2xl font-bold text-emerald-800 mt-0.5 block">
            {metrics.paidCount} Cleared
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#8E7626]/20 shadow-xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7366] block">
            Overdue Balance
          </span>
          <span className="font-serif text-2xl font-bold text-rose-800 mt-0.5 block">
            {metrics.overdueCount} Alerts
          </span>
        </div>
      </div>

      {/* 3. Search & Status Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by invoice number (BAC-INV), buyer institution, or supply location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white border border-[#8E7626]/25 text-xs text-[#14120E] font-medium focus:outline-none focus:border-[#8E7626] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ISSUED">ISSUED</option>
            <option value="PAID">PAID</option>
            <option value="OVERDUE">OVERDUE</option>
            <option value="DRAFT">DRAFT</option>
            <option value="VOID">VOID</option>
          </select>
        </div>
      </div>

      {/* 4. Ledger Data Table */}
      <div className="rounded-2xl border border-[#8E7626]/30 bg-[#FAF7F2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7626]/20 bg-[#F4EFE6] text-[#7A7366] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 font-bold">Invoice No</th>
                <th className="py-4 px-6 font-bold">Billed To (Buyer)</th>
                <th className="py-4 px-6 font-bold">Place of Supply</th>
                <th className="py-4 px-6 font-bold">Line Items</th>
                <th className="py-4 px-6 font-bold">Tax (IGST)</th>
                <th className="py-4 px-6 font-bold">Total Amount</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Dispatch Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7626]/15">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#7A7366]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#8E7626]" />
                      <span>Loading institutional tax invoices...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#7A7366]">
                    <Receipt className="w-8 h-8 text-[#8E7626]/40 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#14120E]">
                      No Commercial Invoices Found
                    </p>
                    <p className="text-xs text-[#7A7366] mt-0.5">
                      Generate an invoice to populate this ledger with itemized dispatch bills.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#EFE8DC]/50 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {inv.invoice_number}
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E]">
                        {inv.billed_to_snapshot?.name || "Institution"}
                      </p>
                      <p className="text-[10px] text-[#7A7366] font-mono mt-0.5">
                        GSTIN: {inv.billed_to_snapshot?.gstin}
                      </p>
                    </td>

                    <td className="py-4 px-6 text-[#554F43]">
                      <div>{inv.place_of_supply}</div>
                      <div className="text-[10px] text-[#7A7366]">
                        Due: {new Date(inv.due_date).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE8DC] border border-[#8E7626]/20 text-[#554F43]">
                        {inv.items?.length || 0} SKUs
                      </span>
                    </td>

                    <td className="py-4 px-6 font-mono text-[#8E7626] font-semibold">
                      {inv.currency} {Number(inv.tax_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-6 font-mono font-bold text-[#14120E] text-sm">
                      {inv.currency} {Number(inv.total_amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={inv.status}
                        onChange={(e) =>
                          handleStatusTransition(
                            inv.id,
                            e.target.value as PaymentStatus
                          )
                        }
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase cursor-pointer border ${
                          inv.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : inv.status === "OVERDUE"
                            ? "bg-rose-100 text-rose-800 border-rose-300"
                            : inv.status === "VOID"
                            ? "bg-stone-200 text-stone-700 border-stone-300"
                            : "bg-[#14120E] text-[#FAF7F2] border-[#14120E]"
                        }`}
                      >
                        <option value="ISSUED">ISSUED</option>
                        <option value="PAID">PAID</option>
                        <option value="OVERDUE">OVERDUE</option>
                        <option value="VOID">VOID</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct PDF / Print Dispatch Tab */}
                        <a
                          href={invoicesApi.getDispatchPdfUrl(inv.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#8E7626]/30 bg-white hover:border-[#8E7626] text-[#8E7626] hover:text-[#14120E] transition-all text-xs font-semibold cursor-pointer shadow-xs"
                          title="Open Printable Dispatch Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Slip</span>
                        </a>

                        {inv.status !== "VOID" && (
                          <button
                            type="button"
                            onClick={() => handleVoidOrDelete(inv.id)}
                            className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                            title="Void Invoice"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Showing <strong className="text-[#14120E]">{filteredInvoices.length}</strong> of{" "}
            {invoices.length} invoices
          </span>
          <span className="font-mono text-[10px]">Tax Engine &bull; GST / IGST Compliant</span>
        </div>
      </div>

      {/* Invoice Generator Drawer */}
      <CreateInvoiceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={fetchInvoices}
      />
    </div>
  );
}