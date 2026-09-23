"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WaterBackground } from "@/components/WaterBackground";
import { ScrollUpDown } from "@/components/ScrollUpDown";
import { MobileTabBar } from "@/components/MobileTabBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col app-shell">
      <WaterBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollUpDown />
      <MobileTabBar />
    </div>
  );
}
