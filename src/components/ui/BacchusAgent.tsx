"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AGENT_BRAND_INTEL, AGENT_FAQ, FAQItem } from "@/data/bacchus-agent-data";

interface ChatMessage {
  id: string;
  sender: "agent" | "guest";
  text: string;
  action?: { label: string; href: string };
  specs?: string;
  tags?: string[];
}

export default function BacchusAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "Welcome to Bacchus World Spirits. I am your Cellar Concierge. Inquire about our cask reserves, tasting notes, or global trade credentials.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendQuery = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "guest",
      text: userQuery,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let reply: ChatMessage;

      if (q.includes("talson")) {
        const d = AGENT_BRAND_INTEL["talsons-12"];
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `${d.name} (${d.category}): ${d.character}`,
          specs: d.specs,
          tags: d.tastingNotes,
          action: { label: "Inspect In Vault", href: "/the-vault" },
        };
      } else if (q.includes("jackie")) {
        const d = AGENT_BRAND_INTEL["jackies-crown"];
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `${d.name} (${d.category}): ${d.character} Perfect Serve: ${d.serve}`,
          specs: d.specs,
          tags: d.tastingNotes,
          action: { label: "View Jackie's Crown", href: "/brands/jackies-crown" },
        };
      } else if (q.includes("boxer") || q.includes("crazy") || q.includes("rum")) {
        const d = AGENT_BRAND_INTEL["crazy-boxer"];
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `${d.name}: ${d.character}`,
          specs: d.specs,
          tags: d.tastingNotes,
          action: { label: "Kinetic Editions", href: "/kinetic-editions" },
        };
      } else if (q.includes("vodka") || q.includes("rozzita")) {
        const d = AGENT_BRAND_INTEL["rozzita"];
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: `${d.name}: ${d.character} Serve: ${d.serve}`,
          specs: d.specs,
          tags: d.tastingNotes,
          action: { label: "Explore Vodkas", href: "/brands/rozzita-vodka" },
        };
      } else if (q.includes("invest") || q.includes("business") || q.includes("distribut") || q.includes("private label")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "We offer Global Brand Distribution, Turnkey Private Labelling, and Exclusive State Ownership in India. Empanelled by HMRC with complete export certification.",
          action: { label: "Commercial Models", href: "/our-business" },
        };
      } else if (q.includes("noida") || q.includes("address") || q.includes("contact") || q.includes("email")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "Corporate Office: B 28 Manaar Tower, Sector 132, Noida, UP. Direct executive connect: md@bacchusspiritsglobal.com.",
          action: { label: "Contact Registry", href: "/contact" },
        };
      } else {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "Our master blending cellars distill 32+ years of tradition across Whiskies, Vodkas, Gins, and Rums. You may select any dossier below:",
          action: { label: "Corporate Portfolio", href: "/brands" },
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 600);
  };

  const handleSelectFaq = (faq: FAQItem) => {
    handleSendQuery(faq.question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      {/* 1. Trigger Icon (Bottom-Right Anchor) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open Bacchus Concierge"
        className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-500 ${
          isOpen
            ? "bg-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.6)] rotate-90"
            : "bg-[#0A0A09] border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:border-[#F3D36A] hover:scale-105"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_70%)] animate-pulse pointer-events-none" />
        
        {isOpen ? (
          <span className="text-[#050505] text-xl font-light leading-none">✕</span>
        ) : (
          <div className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/icon.png"
              alt="Bacchus Crest"
              fill
              className="object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            />
          </div>
        )}

        {/* Unread Indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37] border-2 border-[#050505]"></span>
          </span>
        )}
      </button>

      {/* 2. Interactive Cellar Dossier Interface */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] flex flex-col rounded-2xl bg-[#0C0B0A] border border-[#8E7626]/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="relative p-4 border-b border-[#8E7626]/20 bg-[#12110F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full border border-[#D4AF37]/30 bg-[#050505] p-1">
                <Image src="/icon.png" alt="Bacchus Seal" fill className="object-contain" />
              </div>
              <div>
                <div className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-serif font-bold">
                  Bacchus Agent
                </div>
                <div className="text-[10px] text-[#77736A] tracking-wider uppercase">
                  Cellar & Allocation Concierge
                </div>
              </div>
            </div>
            <span className="text-[10px] tracking-widest text-[#F4F0E6]/50 uppercase border border-[#8E7626]/30 px-2 py-0.5 rounded">
              Est. 1994
            </span>
          </div>

          {/* Messages Runway */}
          <div ref={chatScrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-light scrollbar-thin scrollbar-thumb-[#8E7626]/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "guest" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-xl max-w-[88%] leading-relaxed ${
                    m.sender === "guest"
                      ? "bg-[#1C1B18] text-[#F4F0E6] border border-[#8E7626]/40 rounded-br-none"
                      : "bg-[#141310] text-[#C3BDAF] border border-[#D4AF37]/15 rounded-bl-none shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  <p className="font-sans text-[13px] leading-relaxed text-[#F4F0E6]/90">{m.text}</p>

                  {m.specs && (
                    <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] border-t border-[#8E7626]/20 pt-1.5">
                      {m.specs}
                    </div>
                  )}

                  {m.tags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#050505] text-[#C3BDAF] border border-[#8E7626]/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {m.action && (
                    <Link
                      href={m.action.href}
                      onClick={() => setIsOpen(false)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-[#050505] bg-[#D4AF37] hover:bg-[#F3D36A] px-3 py-1 rounded transition-colors"
                    >
                      <span>{m.action.label}</span>
                      <span>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[#D4AF37] text-[11px] italic pl-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Registry Chips */}
          <div className="px-4 py-2 border-t border-[#8E7626]/15 bg-[#0e0d0b] flex gap-2 overflow-x-auto no-scrollbar">
            {AGENT_FAQ.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSelectFaq(faq)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#C3BDAF] bg-[#171613] hover:text-[#050505] hover:bg-[#D4AF37] border border-[#8E7626]/30 transition-all shrink-0"
              >
                {faq.topic}
              </button>
            ))}
          </div>

          {/* Input Ledger */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputVal);
            }}
            className="p-3 bg-[#12110F] border-t border-[#8E7626]/30 flex items-center gap-2"
          >
            <input suppressHydrationWarning
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask regarding reserves, cask woods, partnerships..."
              className="flex-1 bg-[#050505] border border-[#8E7626]/40 rounded-lg px-3 py-2 text-xs text-[#F4F0E6] placeholder-[#77736A] focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#F3D36A] text-[#050505] text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}