"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Building2,
  Search,
  RefreshCw,
  Eye,
  Globe,
  Trash2,
  FileCheck2,
  AlertCircle,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { Customer } from "@/types/admin/customer";
import { customersApi } from "@/services/customers";
import CustomerDetailDrawer from "@/components/admin/drawers/CustomerDetailDrawer";
import DeleteCustomerModal from "@/components/admin/modals/DeleteCustomerModal";

export default function CustomersRegisterPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search filter
  const [searchTerm, setSearchTerm] = useState("");

  // Drawer and Modal interactions
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await customersApi.list();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to load customers from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const search = searchTerm.toLowerCase();
      return (
        c.company_name.toLowerCase().includes(search) ||
        c.customer_code.toLowerCase().includes(search) ||
        c.country.toLowerCase().includes(search) ||
        (c.tax_identifier && c.tax_identifier.toLowerCase().includes(search))
      );
    });
  }, [customers, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Account Management Registry
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">GET /api/v1/customers</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Institutional Accounts
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`} />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/admin/invoices"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#2A261F] shadow-sm transition-all cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-[#D4AF37]" />
            <span>Bill Customer</span>
          </Link>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Search & Overview Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8474]" />
          <input
            type="text"
            placeholder="Search by institution, code, country, or GST/tax ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#8E7626]/25 text-xs text-[#14120E] placeholder-[#8C8474] focus:outline-none focus:border-[#8E7626] font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto text-xs font-mono text-[#7A7366] px-2">
          <span>Active Accounts:</span>
          <strong className="text-[#14120E]">{customers.length}</strong>
        </div>
      </div>

      {/* 3. Main Data Table */}
      <div className="rounded-2xl border border-[#8E7626]/30 bg-[#FAF7F2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8E7626]/20 bg-[#F4EFE6] text-[#7A7366] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 font-bold">Account Code</th>
                <th className="py-4 px-6 font-bold">Institutional Account</th>
                <th className="py-4 px-6 font-bold">Tax Identifier / GST</th>
                <th className="py-4 px-6 font-bold">Jurisdiction</th>
                <th className="py-4 px-6 font-bold">Onboarded</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E7626]/15">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#7A7366]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#8E7626]" />
                      <span>Loading active customer ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#7A7366]">
                    <Building2 className="w-8 h-8 text-[#8E7626]/40 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#14120E]">No Institutional Customers Found</p>
                    <p className="text-xs text-[#7A7366] mt-0.5">
                      Convert an active lead from the Leads Desk to provision a customer account.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setActiveCustomer(cust)}
                    className="hover:bg-[#EFE8DC]/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 font-mono font-bold text-[#8E7626]">
                      {cust.customer_code}
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-[#14120E] group-hover:text-[#8E7626] transition-colors">
                        {cust.company_name}
                      </p>
                      <p className="text-[10px] text-[#7A7366] font-mono mt-0.5">
                        Manager ID: {cust.account_manager_id}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      {cust.tax_identifier ? (
                        <span className="font-mono text-xs text-[#14120E] font-semibold">
                          {cust.tax_identifier}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#A0988A] italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-[#554F43]">
                        <Globe className="w-3.5 h-3.5 text-[#8E7626]" />
                        <span>{cust.country}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[#7A7366]">
                      {new Date(cust.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCustomer(cust);
                          }}
                          className="p-1.5 rounded-lg border border-[#8E7626]/20 bg-white hover:border-[#8E7626] text-[#8E7626] cursor-pointer"
                          title="View & Edit"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomerToDelete(cust);
                          }}
                          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                          title="Delete Sequence"
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

        <div className="px-6 py-3.5 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex items-center justify-between text-[11px] text-[#7A7366]">
          <span>
            Displaying <strong className="text-[#14120E]">{filteredCustomers.length}</strong> of{" "}
            {customers.length} registered accounts
          </span>
          <span className="font-mono text-[10px]">Institutional Accounts &bull; AES-256</span>
        </div>
      </div>

      {/* Customer Drawer */}
      <CustomerDetailDrawer
        customer={activeCustomer}
        onClose={() => setActiveCustomer(null)}
        onUpdated={() => {
          fetchCustomers();
          setActiveCustomer(null);
        }}
        onDeleteRequested={(cust) => {
          setActiveCustomer(null);
          setCustomerToDelete(cust);
        }}
      />

      {/* Cascade Delete Modal */}
      <DeleteCustomerModal
        customer={customerToDelete}
        isOpen={!!customerToDelete}
        onClose={() => setCustomerToDelete(null)}
        onSuccess={fetchCustomers}
      />
    </div>
  );
}