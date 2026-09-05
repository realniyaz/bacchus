import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import AgeGate from "@/components/layout/AgeGate";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
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

export const metadata: Metadata = {
  title: "Bacchus Distillery | A Legacy In Every Drop",
  description:
    "Talsons' Reserve 12 Years Double Wood Matured. Distinctive luxury single malt whisky handcrafted since 1994.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable}`}>
      <body className="bg-obsidian text-champagne selection:bg-gold-royal selection:text-obsidian antialiased">
        <CustomCursor />
        <SmoothScrollProvider>
          {/* <AgeGate /> */}
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}