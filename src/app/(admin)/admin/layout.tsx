"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Building2,
  Receipt,
  BarChart3,
  UserCheck,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  Sparkles,
  PersonStandingIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads Desk", href: "/admin/leads", icon: Users, badge: "Live" },
  { label: "Customers", href: "/admin/customers", icon: Building2 },
  { label: "Products", href: "/admin/products", icon: PersonStandingIcon },
  { label: "Invoicing & Excise", href: "/admin/invoices", icon: Receipt },
  { label: "Trade Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Profile", href: "/admin/profile", icon: UserCheck },
  
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail] = useState("md@bacchusspiritsglobal.com");

  useEffect(() => {
    if (pathname === "/admin/login" || pathname === "/login") return;
    const token = localStorage.getItem("bacchus_token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("bacchus_token");
    document.cookie = "bacchus_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login" || pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div
      data-cursor-theme="light"
      className="fixed inset-0 h-screen w-screen bg-[#FAF7F2] text-[#14120E] flex overflow-hidden antialiased font-sans select-none"
    >
      {/* MOBILE BACKDROP OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* ========================================================================= */}
      {/* PERSISTENT FIXED DARK OBSIDIAN SIDEBAR                                   */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#0C0C0B] border-r border-[#8E7626]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header Logo */}
        <div>
          <div className="h-16 px-6 border-b border-[#8E7626]/20 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#12110F] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.18)]">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold leading-none">
                  Bacchus Spirits
                </p>
                <h2 className="font-serif text-base tracking-wider text-[#F4F0E6] mt-1">
                  Executive Suite
                </h2>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-[#C3BDAF] hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            <div className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#77736A]">
              Operations Core
            </div>

            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-sans uppercase tracking-[0.16em] transition-all duration-200 group ${
                    isActive
                      ? "bg-[#12110F] text-[#F3D36A] border border-[#D4AF37]/35 shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                      : "text-[#C3BDAF] hover:text-[#F4F0E6] hover:bg-[#12110F]/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? "text-[#D4AF37]"
                          : "text-[#77736A] group-hover:text-[#C3BDAF]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3D36A] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-[#8E7626]/20 bg-[#050505]/60">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#12110F] border border-[#D4AF37]/30 flex items-center justify-center text-xs font-serif text-[#D4AF37]">
              MD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#F4F0E6] truncate">
                Super Administrator
              </p>
              <p className="text-[10px] text-[#77736A] truncate">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#12110F] border border-[#B51F24]/30 hover:border-[#B51F24] text-[#C3BDAF] hover:text-[#F4F0E6] transition-all text-xs font-sans uppercase tracking-[0.16em] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#B51F24]" />
            <span>Sign Out Desk</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* INDEPENDENTLY SCROLLING LIGHT RIGHT VIEWPORT                             */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col h-full lg:pl-72 min-w-0 bg-[#FAF7F2]">
        
        {/* Sticky Header inside the view */}
        <header className="h-16 px-6 sm:px-8 border-b border-[#8E7626]/20 bg-[#FAF7F2]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-[#EFE8DC] border border-[#8E7626]/30 text-[#14120E] hover:text-[#8E7626]"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-[#7A7366]">
              <span>Console</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#8E7626] uppercase tracking-wider font-semibold">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DC] border border-[#8E7626]/20 text-[10px] uppercase font-mono tracking-widest text-[#8E7626]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>FastAPI Port 8000 Sync</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#6A6458] hover:text-[#14120E] transition-colors font-sans uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8E7626]" />
              <span>Live Site</span>
            </Link>

            <div className="w-[1px] h-6 bg-[#8E7626]/20 hidden sm:block" />

            <button
              type="button"
              className="relative p-2 rounded-full bg-[#EFE8DC] border border-[#8E7626]/20 text-[#6A6458] hover:text-[#14120E] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8E7626]" />
            </button>
          </div>
        </header>

        {/* Dedicated Inner Scroll Container */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}