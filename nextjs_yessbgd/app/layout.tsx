import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "YESS Bangladesh — Sovereign Venture Builder & Enterprise Solutions",
    template: "%s | YESS Bangladesh",
  },
  description:
    "YESS Bangladesh is an institutional venture builder and multi-industry conglomerate in Bangladesh. Building digital infrastructure, enterprise software, media OTT, and cold-chain agritech across all 64 districts.",
  metadataBase: new URL("https://yessbd.com"),
  keywords: [
    "YESS Bangladesh",
    "Yess Soft",
    "Akash OTT",
    "Enterprise Software Bangladesh",
    "Cloud Solutions Dhaka",
    "Venture Studio Bangladesh",
  ],
  authors: [{ name: "YESS Bangla Private Limited" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    siteName: "YESS Bangladesh",
    title: "YESS Bangladesh — Sovereign Enterprise Studio",
    description: "Sovereign enterprise technology, cloud platforms, and venture studios across Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileTabBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
