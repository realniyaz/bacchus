"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  UserCheck,
  ShieldCheck,
  Save,
  KeyRound,
  Globe2,
  Mail,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  Building,
  Calendar,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { UserProfile, UserProfileUpdate } from "@/types/admin/profile";
import { profileApi } from "@/services/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Notifications
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit Profile Form
  const [name, setName] = useState("");
  const [territory, setTerritory] = useState("");

  // Password Rotation Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Load Profile from GET /api/v1/profile/me
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setProfileMsg(null);
    try {
      const data = await profileApi.getMe();
      setProfile(data);
      setName(data.name || "");
      setTerritory(data.territory || "");
    } catch (err: any) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.detail || "Failed to load executive profile. Check token clearance.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle Profile Update via PATCH /api/v1/profile/me
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    try {
      const payload: UserProfileUpdate = {
        name: name.trim(),
        territory: territory.trim() || undefined,
      };
      const updated = await profileApi.updateMe(payload);
      setProfile(updated);
      setProfileMsg({ type: "success", text: "Identity & jurisdictional clearance successfully updated." });
    } catch (err: any) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.detail || "Profile mutation failed.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Rotation via POST /api/v1/profile/me/change-password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "New password must be at least 8 characters long." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passphrase confirmation does not match." });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await profileApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPasswordMsg({ type: "success", text: res.message || "Passphrase successfully updated." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordMsg({
        type: "error",
        text: err.response?.data?.detail || "Failed to rotate passphrase. Verify existing credentials.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-[#14120E] antialiased">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#8E7626]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E7626] font-bold">
              Identity &amp; Governance
            </span>
            <span className="text-[10px] text-[#A0988A]">•</span>
            <span className="text-[10px] text-[#7A7366] font-mono">
              /api/v1/profile/me
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#14120E] tracking-wide font-bold">
            Executive Profile &amp; Clearance
          </h1>
        </div>

        <button
          onClick={fetchProfile}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#8E7626]/30 bg-[#FAF7F2] text-[#554F43] hover:text-[#14120E] hover:border-[#8E7626] transition-all cursor-pointer shadow-xs disabled:opacity-50 self-start md:self-auto"
          title="Reload User State"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#8E7626]" : "text-[#8E7626]"}`}
          />
          <span className="text-xs uppercase tracking-wider font-semibold">Sync Identity</span>
        </button>
      </div>

      {/* 2. Clearance Identity Dossier Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border border-[#8E7626]/40 bg-[#EFE8DC] flex items-center justify-center font-serif text-2xl font-bold text-[#8E7626] shadow-sm">
              {profile?.name ? profile.name.slice(0, 2).toUpperCase() : "MD"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold text-[#14120E]">
                  {profile?.name || "Authenticating..."}
                </h2>
                {profile?.is_active && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[9px] font-mono font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Active Session
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7A7366] font-mono mt-0.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8E7626]" />
                {profile?.email || "md@bacchusspiritsglobal.com"}
              </p>
            </div>
          </div>

          {/* Role Badge & ID */}
          <div className="flex flex-col sm:items-end border-t sm:border-t-0 border-[#8E7626]/15 pt-4 sm:pt-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A7366]">
              Authorization Tier
            </span>
            <span className="mt-1 px-3 py-1 rounded-lg bg-[#14120E] text-[#FAF7F2] text-xs font-mono font-bold uppercase shadow-xs">
              {profile?.role || "SUPER_ADMIN"}
            </span>
            <span className="text-[10px] font-mono text-[#A0988A] mt-1.5">
              UUID: {profile?.id ? `${profile.id.slice(0, 8)}...${profile.id.slice(-4)}` : "..."}
            </span>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* 3. Forms Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Details Edit (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#14120E]">
                Personal Coordinates
              </h3>
              <p className="text-xs text-[#7A7366] mt-0.5">
                Update display signature and assigned trade territories[cite: 1].
              </p>
            </div>
            <UserCheck className="w-5 h-5 text-[#8E7626]" />
          </div>

          {profileMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                profileMsg.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-rose-50 border-rose-300 text-rose-800"
              }`}
            >
              {profileMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Full Official Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mohit Shukla"
                className="w-full mt-1 px-3.5 py-2.5 text-xs rounded-xl border border-[#8E7626]/30 bg-white text-[#14120E] focus:outline-none focus:border-[#8E7626] font-medium"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Assigned Trade Jurisdiction / Territory[cite: 1]
              </label>
              <div className="relative flex items-center mt-1">
                <Globe2 className="absolute left-3.5 w-4 h-4 text-[#8C8474] pointer-events-none" />
                <input
                  type="text"
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  placeholder="e.g. Global HQ, Domestic-North, Africa-East"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#8E7626]/30 bg-white text-[#14120E] focus:outline-none focus:border-[#8E7626] font-medium"
                />
              </div>
              <p className="text-[10px] text-[#7A7366] mt-1">
                Designates which regional leads, customer accounts, and logistics desks you command.
              </p>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Administrative Clearance Email (Immutable)
              </label>
              <input
                type="email"
                disabled
                value={profile?.email || ""}
                className="w-full mt-1 px-3.5 py-2.5 text-xs font-mono rounded-xl border border-[#8E7626]/20 bg-[#EFE8DC]/50 text-[#7A7366] cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {savingProfile ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                ) : (
                  <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                )}
                <span>Save Profile Parameters</span>
              </button>
            </div>
          </form>
        </div>

        {/* Security & Password Rotation (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#8E7626]/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#8E7626]/20">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#14120E]">
                Rotate Passphrase
              </h3>
              <p className="text-xs text-[#7A7366] mt-0.5">
                Update credential hash (Bcrypt protected)[cite: 1].
              </p>
            </div>
            <KeyRound className="w-5 h-5 text-[#8E7626]" />
          </div>

          {passwordMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                passwordMsg.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-rose-50 border-rose-300 text-rose-800"
              }`}
            >
              {passwordMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Existing Security Passphrase *
              </label>
              <div className="relative flex items-center mt-1">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#8C8474] pointer-events-none" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-[#8E7626]/30 bg-white text-[#14120E] focus:outline-none focus:border-[#8E7626]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 text-[#8C8474] hover:text-[#14120E] cursor-pointer"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                New Security Passphrase *
              </label>
              <div className="relative flex items-center mt-1">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#8C8474] pointer-events-none" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-[#8E7626]/30 bg-white text-[#14120E] focus:outline-none focus:border-[#8E7626]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 text-[#8C8474] hover:text-[#14120E] cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold tracking-wider text-[#554F43]">
                Confirm New Passphrase *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new passphrase"
                className="w-full mt-1 px-3.5 py-2.5 text-xs rounded-xl border border-[#8E7626]/30 bg-white text-[#14120E] focus:outline-none focus:border-[#8E7626]"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#14120E] text-[#FAF7F2] hover:bg-[#2A261F] flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 mt-2"
            >
              {savingPassword ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              ) : (
                <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
              )}
              <span>Commit Passphrase Rotation</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}