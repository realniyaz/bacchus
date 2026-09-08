"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Globe,
  Mail,
  Phone,
  Box,
  Loader2,
  Calendar,
  MessageSquare,
  Sparkles,
  Clock,
  Plus,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/admin/lead";
import { leadsApi } from "@/services/leads";
import { crmApi } from "@/services/crm";
import ConvertCustomerModal from "@/components/admin/modals/ConvertCustomerModal";

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onUpdated: () => void;
}

const STATUS_OPTIONS: LeadStatus[] = [
  "NEW",
  "ASSIGNED",
  "CONTACTED",
  "NEGOTIATION",
  "CONVERTED",
  "LOST",
];

export default function LeadDetailDrawer({ lead, onClose, onUpdated }: Props) {
  const [activeTab, setActiveTab] = useState<"details" | "activities" | "followups">("details");
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Quick activity log state
  const [noteText, setNoteText] = useState("");
  const [activityType, setActivityType] = useState<"CALL" | "NOTE" | "MEETING">("CALL");

  // Quick follow-up schedule state
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpType, setFollowUpType] = useState<"CALL" | "EMAIL" | "TASTING_MEETING">("CALL");
  const [followUpNotes, setFollowUpNotes] = useState("");

  // Convert modal
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  const fetchTimeline = useCallback(async () => {
    if (!lead) return;
    setLoadingTimeline(true);
    try {
      const data = await crmApi.getLeadTimeline(lead.id);
      setTimeline(Array.isArray(data) ? data : []);
    } catch {
      setTimeline([]);
    } finally {
      setLoadingTimeline(false);
    }
  }, [lead]);

  useEffect(() => {
    if (lead) {
      fetchTimeline();
    }
  }, [lead, fetchTimeline]);

  if (!lead) return null;

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (newStatus === "CONVERTED") {
      setIsConvertModalOpen(true);
      return;
    }
    setUpdating(true);
    try {
      await leadsApi.update(lead.id, { status: newStatus });
      onUpdated();
    } finally {
      setUpdating(false);
    }
  };

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setUpdating(true);
    try {
      await crmApi.logActivity({
        lead_id: lead.id,
        type: activityType,
        meta_data: { note: noteText.trim() },
      });
      setNoteText("");
      fetchTimeline();
    } finally {
      setUpdating(false);
    }
  };

  const handleScheduleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpDate) return;
    setUpdating(true);
    try {
      await crmApi.scheduleFollowUp({
        lead_id: lead.id,
        scheduled_at: new Date(followUpDate).toISOString(),
        type: followUpType,
        notes: followUpNotes.trim() || undefined,
      });
      setFollowUpNotes("");
      setFollowUpDate("");
      alert("Follow-up successfully scheduled.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#FAF7F2] border-l border-[#8E7626]/30 shadow-2xl flex flex-col justify-between text-[#14120E] antialiased">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#8E7626]/20 bg-[#F4EFE6]">
            <div>
              <span className="font-mono text-xs text-[#8E7626] font-bold tracking-wider">
                {lead.lead_code}
              </span>
              <h3 className="font-serif text-xl font-bold mt-0.5">{lead.company_name}</h3>
            </div>
            <button onClick={onClose} className="text-[#7A7366] hover:text-[#14120E]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-[#8E7626]/20 bg-[#FAF7F2] px-6 pt-2">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "details"
                  ? "border-b-2 border-[#8E7626] text-[#8E7626]"
                  : "text-[#7A7366] hover:text-[#14120E]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "activities"
                  ? "border-b-2 border-[#8E7626] text-[#8E7626]"
                  : "text-[#7A7366] hover:text-[#14120E]"
              }`}
            >
              Timeline Ledger
            </button>
            <button
              onClick={() => setActiveTab("followups")}
              className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "followups"
                  ? "border-b-2 border-[#8E7626] text-[#8E7626]"
                  : "text-[#7A7366] hover:text-[#14120E]"
              }`}
            >
              Schedule Follow-Up
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)]">
            {activeTab === "details" && (
              <>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#EFE8DC] border border-[#8E7626]/20">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                      Qualification Metric
                    </p>
                    <p className="font-serif text-2xl font-bold mt-0.5">{lead.score} / 100</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                      lead.tier === "HOT"
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : lead.tier === "WARM"
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {lead.tier} TIER
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                    Trade Coordinates
                  </h4>
                  <div className="space-y-2 text-xs bg-white/70 p-4 rounded-xl border border-[#8E7626]/15">
                    <div className="flex items-center gap-2 text-[#554F43]">
                      <Globe className="w-4 h-4 text-[#8E7626]" />
                      <span>{lead.country} {lead.state ? `(${lead.state})` : ""}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#554F43]">
                      <Mail className="w-4 h-4 text-[#8E7626]" />
                      <a href={`mailto:${lead.email}`} className="underline">{lead.email}</a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-[#554F43]">
                        <Phone className="w-4 h-4 text-[#8E7626]" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#554F43]">
                      <Box className="w-4 h-4 text-[#8E7626]" />
                      <span>Volume: {lead.volume_estimate || "Unspecified"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
                      Pipeline Transition
                    </h4>
                    {updating && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8E7626]" />}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUS_OPTIONS.map((st) => (
                      <button
                        key={st}
                        type="button"
                        disabled={updating || lead.status === st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                          lead.status === st
                            ? "bg-[#14120E] text-[#FAF7F2]"
                            : "bg-[#EFE8DC]/70 hover:bg-[#EFE8DC] text-[#554F43] border border-[#8E7626]/20"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "activities" && (
              <div className="space-y-4">
                <form onSubmit={handleLogActivity} className="p-3.5 rounded-xl bg-white border border-[#8E7626]/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#8E7626]">Log Interaction</span>
                    <select
                      value={activityType}
                      onChange={(e: any) => setActivityType(e.target.value)}
                      className="text-xs border border-[#8E7626]/30 rounded px-2 py-0.5 bg-white"
                    >
                      <option value="CALL">Phone Call</option>
                      <option value="NOTE">Executive Note</option>
                      <option value="MEETING">Tasting Meeting</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter dispatch notes, tasting feedback, or pricing terms..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-[#8E7626]/30 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={updating}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#14120E] text-[#FAF7F2]"
                    >
                      Record Entry
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366] block">
                    Ledger History
                  </span>
                  {loadingTimeline ? (
                    <div className="py-6 text-center text-xs text-[#7A7366]">Loading activities...</div>
                  ) : timeline.length === 0 ? (
                    <div className="py-6 text-center text-xs text-[#7A7366]">No interactions logged yet.</div>
                  ) : (
                    timeline.map((act) => (
                      <div key={act.id} className="p-3 rounded-lg bg-white/70 border border-[#8E7626]/15 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[#7A7366] font-mono">
                          <span className="font-bold text-[#8E7626]">{act.type}</span>
                          <span>{new Date(act.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[#14120E]">{act.meta_data?.note || "Status updated"}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === "followups" && (
              <form onSubmit={handleScheduleFollowUp} className="p-4 rounded-xl bg-white border border-[#8E7626]/20 space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#8E7626] block">
                  Schedule Agenda Reminder
                </span>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#554F43]">Type</label>
                  <select
                    value={followUpType}
                    onChange={(e: any) => setFollowUpType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white"
                  >
                    <option value="CALL">Follow-Up Phone Call</option>
                    <option value="EMAIL">Follow-Up Email</option>
                    <option value="TASTING_MEETING">Tasting Session</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#554F43]">Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-[#8E7626]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#554F43]">Agenda Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Present Talsons 12 volume discounts for 6 containers"
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    className="w-full mt-1 p-2 text-xs rounded-lg border border-[#8E7626]/30 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-2.5 rounded-lg bg-[#14120E] text-[#FAF7F2] font-bold text-xs uppercase tracking-wider"
                >
                  Confirm Agenda
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-[#8E7626]/20 bg-[#F4EFE6] text-[10px] font-mono text-[#7A7366] flex justify-between items-center">
          <span>ID: {lead.id}</span>
          <span>Created: {new Date(lead.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <ConvertCustomerModal
        lead={lead}
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        onSuccess={() => {
          onUpdated();
          onClose();
        }}
      />
    </>
  );
}