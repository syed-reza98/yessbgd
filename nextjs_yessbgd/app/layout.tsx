import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { PublicChrome } from "@/components/PublicChrome";
import { getMenuItems, getCompanySettings, getVentures } from "@/lib/cms";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    url: "https://yessbd.com",
    siteName: "YESS Bangladesh",
    title: "Yess Bangla Private Limited — Sovereign Enterprise Studio",
    description: "Sovereign enterprise technology, cloud platforms, and venture studios across Bangladesh.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yess Bangla Private Limited — Sovereign Venture Studio & Holding Company",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yess Bangla Private Limited — Sovereign Enterprise Studio",
    description: "Sovereign enterprise technology, cloud platforms, and venture studios across Bangladesh.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerMenus, footerMenus, settings, ventures] = await Promise.all([
    getMenuItems("header"),
    getMenuItems("footer"),
    getCompanySettings(),
    getVentures(),
  ]);

  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-teal-900 focus:text-amber-300 focus:border focus:border-amber-400 focus:rounded-xl focus:shadow-2xl focus:font-semibold focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <PublicChrome
            headerMenus={headerMenus}
            footerMenus={footerMenus}
            settings={settings}
            ventures={ventures}
          >
            {children}
          </PublicChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}

