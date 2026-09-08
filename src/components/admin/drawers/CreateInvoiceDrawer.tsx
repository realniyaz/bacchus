"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  Plus,
  Trash2,
  Loader2,
  Calculator,
  Receipt,
  FileCheck2,
  Building2,
} from "lucide-react";
import { Customer } from "@/types/admin/customer";
import { Product } from "@/types/admin/product";
import { InvoiceCreatePayload, InvoiceItemCreate } from "@/types/admin/invoice";
import { customersApi } from "@/services/customers";
import { productsApi } from "@/services/products";
import { invoicesApi } from "@/services/invoices";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateInvoiceDrawer({ isOpen, onClose, onSuccess }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [supplyCountry, setSupplyCountry] = useState("India");
  const [placeOfSupply, setPlaceOfSupply] = useState("Punjab Depot (State Code 03)");
  const [notes, setNotes] = useState(
    "State excise wholesale consignment under Bonded Excise Clearance."
  );

  // Buyer Snapshot Details
  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerGstin, setBuyerGstin] = useState("03AABCC1234F1ZP");
  const [buyerPan, setBuyerPan] = useState("AABCC1234F");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("+919876543210");

  // Itemized SKUs
  const [items, setItems] = useState<
    Array<{
      sku_code: string;
      description: string;
      unit: string;
      quantity: number;
      rate: number;
      gst_percent: number;
    }>
  >([
    {
      sku_code: "TAL-12-750",
      description: "Talsons' Reserve 12Y Single Malt Whisky (12x750ml)",
      unit: "Cases",
      quantity: 100,
      rate: 3500.0,
      gst_percent: 18.0,
    },
  ]);

  // Load Customers & Products catalog for fast selection
  useEffect(() => {
    if (!isOpen) return;
    async function loadData() {
      try {
        const [custRes, prodRes] = await Promise.all([
          customersApi.list(),
          productsApi.list({ active_only: true }),
        ]);
        setCustomers(custRes);
        setProducts(prodRes);

        if (custRes.length > 0 && !selectedCustomerId) {
          applyCustomer(custRes[0]);
        }
      } catch {
        setError("Failed to load customer or SKU dependencies.");
      }
    }
    loadData();
  }, [isOpen]);

  const applyCustomer = (cust: Customer) => {
    setSelectedCustomerId(cust.id);
    setBuyerName(cust.company_name);
    setBuyerAddress(`Plot 14, Commercial Industrial Corridor, ${cust.country}`);
    setBuyerGstin(cust.tax_identifier || "03AABCC1234F1ZP");
    setBuyerPan(
      cust.tax_identifier && cust.tax_identifier.length >= 10
        ? cust.tax_identifier.slice(2, 12)
        : "AABCC1234F"
    );
    setBuyerEmail(`accounts@${cust.company_name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`);
  };

  const handleCustomerChange = (custId: string) => {
    const cust = customers.find((c) => c.id === custId);
    if (cust) applyCustomer(cust);
  };

  const handleSkuSelection = (index: number, skuCode: string) => {
    const prod = products.find((p) => p.sku_code === skuCode);
    const updated = [...items];
    if (prod) {
      updated[index] = {
        ...updated[index],
        sku_code: prod.sku_code,
        description: prod.name,
        unit: prod.unit,
        rate: Number(prod.base_rate),
        gst_percent: Number(prod.default_gst_percent),
      };
    } else {
      updated[index].sku_code = skuCode;
    }
    setItems(updated);
  };

  const addItemRow = () => {
    const defaultProd = products[0];
    setItems([
      ...items,
      {
        sku_code: defaultProd?.sku_code || "TAL-12-750",
        description: defaultProd?.name || "Single Malt 750ml",
        unit: defaultProd?.unit || "Cases",
        quantity: 50,
        rate: defaultProd ? Number(defaultProd.base_rate) : 3500,
        gst_percent: defaultProd ? Number(defaultProd.default_gst_percent) : 18.0,
      },
    ]);
  };

  const removeItemRow = (idx: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // Real-time Consignment Aggregators
  const calculations = useMemo(() => {
    let subtotal = 0;
    let taxAmount = 0;

    const rowCalcs = items.map((it) => {
      const amount = it.quantity * it.rate;
      const igst = amount * (it.gst_percent / 100);
      const total = amount + igst;
      subtotal += amount;
      taxAmount += igst;
      return { amount, igst, total };
    });

    return {
      subtotal,
      taxAmount,
      totalAmount: subtotal + taxAmount,
      rowCalcs,
    };
  }, [items]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: InvoiceCreatePayload = {
        customer_id: selectedCustomerId,
        currency,
        due_date: new Date(dueDate).toISOString(),
        supply_country: supplyCountry,
        place_of_supply: placeOfSupply,
        notes,
        billed_to: {
          name: buyerName,
          address: buyerAddress,
          gstin: buyerGstin,
          pan: buyerPan,
          email: buyerEmail,
          phone: buyerPhone,
        },
        items: items.map((it) => ({
          sku_code: it.sku_code,
          description: it.description,
          unit: it.unit,
          quantity: Number(it.quantity),
          rate: Number(it.rate),
          gst_percent: Number(it.gst_percent),
        })),
      };

      await invoicesApi.create(payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to generate commercial tax invoice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl bg-[#FAF7F2] border-l border-[#8E7626]/30 shadow-2xl flex flex-col justify-between text-[#14120E] antialiased">
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EFE8DC] border border-[#8E7626]/30 flex items-center justify-center text-[#8E7626]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">
                Commercial Invoice Builder
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#7A7366]">
                SKU Math &bull; Bilateral GST Dispatch
              </p>
            </div>
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
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form
          id="invoice-form"
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-190px)]"
        >
          {/* Section 1: Target Customer & Parameters */}
          <div className="p-4 rounded-xl bg-white border border-[#8E7626]/20 space-y-3">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#8E7626] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              1. Institutional Consignee &amp; Terms
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Select Customer Account *
                </label>
                <select
                  required
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company_name} ({c.customer_code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Settlement Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Supply Country
                </label>
                <input
                  type="text"
                  required
                  value={supplyCountry}
                  onChange={(e) => setSupplyCountry(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Place of Supply (Jurisdiction) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Punjab Depot (State Code 03)"
                  value={placeOfSupply}
                  onChange={(e) => setPlaceOfSupply(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Bilateral Billed-To Party Snapshot */}
          <div className="p-4 rounded-xl bg-white border border-[#8E7626]/20 space-y-3">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#8E7626]">
              2. Billed To (Buyer Party Snapshot)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Legal Entity Name
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Official Trade Email
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#554F43]">
                Registered Consignee Address
              </label>
              <input
                type="text"
                required
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  GSTIN (15-Char)
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={buyerGstin}
                  onChange={(e) => setBuyerGstin(e.target.value.toUpperCase())}
                  className="w-full mt-1 px-3 py-2 text-xs font-mono uppercase rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  PAN (10-Char)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={buyerPan}
                  onChange={(e) => setBuyerPan(e.target.value.toUpperCase())}
                  className="w-full mt-1 px-3 py-2 text-xs font-mono uppercase rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#554F43]">
                  Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Itemized SKU Billing Rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#8E7626]">
                3. Itemized Spirits SKUs &amp; Line Math
              </h4>
              <button
                type="button"
                onClick={addItemRow}
                className="flex items-center gap-1 text-xs font-bold text-[#8E7626] hover:text-[#14120E] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#8E7626]/20 grid grid-cols-12 gap-2.5 items-end text-xs"
                >
                  <div className="col-span-12 sm:col-span-4">
                    <label className="text-[9px] uppercase font-bold text-[#7A7366] block">
                      SKU Code
                    </label>
                    <select
                      value={item.sku_code}
                      onChange={(e) => handleSkuSelection(idx, e.target.value)}
                      className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-[#8E7626]/30 text-xs font-mono font-bold bg-white"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.sku_code}>
                          {p.sku_code} - {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[9px] uppercase font-bold text-[#7A7366] block">
                      Qty
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].quantity = Number(e.target.value);
                        setItems(updated);
                      }}
                      className="w-full mt-1 px-2.5 py-1.5 font-mono text-right rounded-lg border border-[#8E7626]/30 text-xs"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[9px] uppercase font-bold text-[#7A7366] block">
                      Rate ({currency})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={item.rate}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].rate = Number(e.target.value);
                        setItems(updated);
                      }}
                      className="w-full mt-1 px-2.5 py-1.5 font-mono text-right rounded-lg border border-[#8E7626]/30 text-xs"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label className="text-[9px] uppercase font-bold text-[#7A7366] block">
                      GST %
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.gst_percent}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[idx].gst_percent = Number(e.target.value);
                        setItems(updated);
                      }}
                      className="w-full mt-1 px-2.5 py-1.5 font-mono text-right rounded-lg border border-[#8E7626]/30 text-xs"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center pb-1.5">
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      disabled={items.length <= 1}
                      className="text-rose-600 hover:text-rose-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calculated Line Math Preview */}
                  <div className="col-span-12 flex items-center justify-between text-[11px] font-mono text-[#7A7366] pt-2 border-t border-[#8E7626]/10">
                    <span>
                      Txn Value: {currency} {calculations.rowCalcs[idx]?.amount.toFixed(2)}
                    </span>
                    <span>
                      IGST: {currency} {calculations.rowCalcs[idx]?.igst.toFixed(2)}
                    </span>
                    <span className="font-bold text-[#14120E]">
                      Line Total: {currency} {calculations.rowCalcs[idx]?.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Notes */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
              Consignment Remarks &amp; Statutory Declarations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 p-3 text-xs rounded-lg border border-[#8E7626]/30 bg-white focus:outline-none"
            />
          </div>
        </form>
      </div>

      {/* Drawer Footer: Total Aggregations & Dispatch Trigger */}
      <div className="p-6 border-t border-[#8E7626]/20 bg-[#F4EFE6] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-right sm:text-left w-full sm:w-auto">
          <div className="text-xs text-[#7A7366] flex items-center gap-3">
            <span>Subtotal: {currency} {calculations.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            <span>&bull;</span>
            <span className="text-[#8E7626] font-semibold">Total IGST: {currency} {calculations.taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="font-serif text-2xl font-bold text-[#14120E]">
            {currency} {calculations.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2.5 text-xs rounded-lg border border-[#8E7626]/30 text-[#7A7366] hover:bg-[#EFE8DC] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="invoice-form"
            disabled={loading}
            className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            ) : (
              <FileCheck2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
            <span>Commit &amp; Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
}