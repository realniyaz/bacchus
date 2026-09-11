"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import axios from "axios";

const CINEMATIC_STORIES = [
  {
    image: "/assets/banner.png",
    pillar: "FLAGSHIP RESERVE • EST. 1994",
    title: "Talsons' Reserve 12",
    description:
      "Double wood matured in charred oak casks under 32 years of master blending heritage.",
    stat: "12 YRS DOUBLE WOOD",
  },
  {
    image: "/assets/banner3.png",
    pillar: "INDUSTRIAL DISTILLATION",
    title: "The Punjab Column Grid",
    description:
      "Continuous copper pot rectifiers powering high-volume distribution corridors across 19 nations.",
    stat: "ISO 9001:2015 & HACCP",
  },
  {
    image: "/assets/banner4.png",
    pillar: "SOVEREIGN PORTFOLIO",
    title: "Engineered Distinction",
    description:
      "Jackie's Crown, Crazy Boxer, and Rozzita Vodka driving institutional trade scale.",
    stat: "40+ FORMULATED SKUS",
  },
];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

export default function AdminLoginPage() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("md@bacchusspiritsglobal.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Background carousel rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CINEMATIC_STORIES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email.trim());
      formData.append("password", password);

      const res = await axios.post(`${API_BASE}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 12000,
      });

      const { access_token } = res.data;

      localStorage.setItem("bacchus_token", access_token);
      document.cookie = `bacchus_token=${access_token}; path=/; max-age=${
        60 * 60 * 12
      }; SameSite=Lax;`;

      router.replace("/admin");
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        setErrorMsg("Clearance denied. Please verify executive email and passphrase.");
      } else if (err.code === "ECONNABORTED") {
        setErrorMsg("Authentication request timed out. The server cluster is warming up.");
      } else if (err.code === "ERR_NETWORK") {
        setErrorMsg("Backend cluster unreachable. Check Render host connection.");
      } else {
        setErrorMsg(
          err.response?.data?.detail || "Authentication cluster unreachable."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      data-cursor-theme="light"
      className="relative w-full h-screen min-h-[640px] flex overflow-hidden bg-[#050505] antialiased select-none font-sans"
    >
      {/* ========================================================================= */}
      {/* LEFT VIEWPORT: FAST HARDWARE-ACCELERATED CROSSFADE                       */}
      {/* ========================================================================= */}
      <div className="relative hidden lg:flex lg:w-7/12 xl:w-2/3 h-full overflow-hidden bg-[#0C0C0B] items-end p-12 xl:p-20 text-[#F4F0E6]">
        {CINEMATIC_STORIES.map((story, i) => (
          <div
            key={story.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              activeIndex === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={story.image}
              alt="Bacchus Spirits Operational Infrastructure"
              fill
              priority={i === 0}
              quality={75}
              sizes="(max-width: 1024px) 0vw, 65vw"
              className="object-cover object-center"
            />
            {/* Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/30 to-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.15)_0%,transparent_60%)]" />
          </div>
        ))}

        {/* Ambient Amber Glow */}
        <div className="absolute bottom-12 left-12 w-96 h-96 bg-[#C87A1E]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Story Metadata */}
        <div className="relative z-20 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#12110F]/80 border border-[#D4AF37]/40 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3D36A] font-semibold">
              {CINEMATIC_STORIES[activeIndex].pillar}
            </span>
          </div>

          <h2 className="font-serif text-3xl xl:text-5xl text-[#F4F0E6] tracking-wide mb-3 leading-tight transition-all duration-300">
            {CINEMATIC_STORIES[activeIndex].title}
          </h2>

          <p className="text-sm text-[#C3BDAF] leading-relaxed font-light mb-4 max-w-lg">
            {CINEMATIC_STORIES[activeIndex].description}
          </p>

          <div className="inline-block px-3 py-1 rounded border border-[#8E7626]/40 bg-[#050505]/60 text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
            {CINEMATIC_STORIES[activeIndex].stat}
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2.5 mt-8">
            {CINEMATIC_STORIES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                  activeIndex === i
                    ? "w-10 bg-[#D4AF37]"
                    : "w-2.5 bg-[#77736A]/50 hover:bg-[#C3BDAF]"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT VIEWPORT: PARCHMENT & LIMESTONE EXECUTIVE PORTAL                   */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-5/12 xl:w-1/3 h-full flex flex-col justify-between p-8 sm:p-12 xl:p-14 bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E8] to-[#EFE8DC] border-l border-[#8E7626]/30 text-[#14120E] relative z-20 overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#8E7626]/40 bg-[#FAF7F2] flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#8E7626]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8E7626] font-bold leading-none">
                Bacchus Spirits
              </p>
              <h1 className="font-serif text-lg tracking-wider text-[#14120E] mt-1">
                Executive Desk
              </h1>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#7A7366] px-2.5 py-1 rounded bg-[#EFE8DC] border border-[#8E7626]/20 font-medium">
            TLS ENCRYPTED
          </span>
        </div>

        {/* Central Credential Card */}
        <div className="w-full max-w-sm mx-auto my-auto py-8">
          <div className="mb-7">
            <div className="inline-flex items-center gap-2 mb-2 text-xs text-[#8E7626] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#8E7626]" />
              <span className="tracking-wide">Operations Gateway</span>
            </div>
            <h2 className="font-serif text-3xl text-[#14120E] tracking-wide mb-2">
              Authorize Clearance
            </h2>
            <p className="text-xs text-[#6A6458] leading-relaxed">
              Enter your administrative credentials to manage global distribution, invoicing, and institutional customer accounts.
            </p>
          </div>

          {/* Feedback Notice */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[#B51F24]/10 border border-[#B51F24]/30 flex items-start gap-2.5 mb-6 text-xs text-[#84191D]">
              <AlertCircle className="w-4 h-4 text-[#B51F24] shrink-0 mt-0.5" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Identity Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#554F43] font-semibold block">
                Administrative Identity
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-[#8C8474] pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin username"
                  className="w-full pl-10 pr-4 py-3.5 bg-[#FAF7F2] text-xs text-[#14120E] rounded-xl border border-[#D5CABB] placeholder-[#A0988A] focus:outline-none focus:border-[#8E7626] focus:ring-1 focus:ring-[#8E7626] shadow-sm transition-all font-medium"
                />
              </div>
            </div>

            {/* Passphrase Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#554F43] font-semibold block">
                Security Passphrase
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#8C8474] pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full pl-10 pr-10 py-3.5 bg-[#FAF7F2] text-xs text-[#14120E] rounded-xl border border-[#D5CABB] placeholder-[#A0988A] focus:outline-none focus:border-[#8E7626] focus:ring-1 focus:ring-[#8E7626] shadow-sm transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#8C8474] hover:text-[#14120E] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Authorize Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-4 rounded-xl bg-[#14120E] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-[0.22em] overflow-hidden transition-all duration-300 hover:bg-[#2A261F] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer mt-3 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span className="text-[#FAF7F2]">Enter Panel</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Audit Footnote */}
        <div className="pt-6 border-t border-[#8E7626]/20 flex items-center justify-between text-[10px] text-[#7A7366]">
          <span>AES-256 TLS Protected</span>
          <span>Bacchus Internal Systems</span>
        </div>
      </div>
    </main>
  );
}