"use client";

import { Cormorant_Garamond, Syne } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgeGate from "@/components/layout/AgeGate";
import CookieConsentModal from "@/components/layout/CookieConsentModal";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import BacchusAgent from "@/components/ui/BacchusAgent";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body className="bg-obsidian text-champagne selection:bg-gold-royal selection:text-obsidian antialiased">
        <CustomCursor />
        
        {/* Suppress consumer verification gates and overlays on admin consoles */}
        {!isAdminRoute && <AgeGate />}
        {!isAdminRoute && <CookieConsentModal />}

        <SmoothScrollProvider>
          {!isAdminRoute && <Navbar />}
          {children}
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <BacchusAgent />}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}