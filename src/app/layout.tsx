import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ClientInit } from "@/components/ClientInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YESS Bangla — Business Consulting & IT Solutions in Bangladesh",
  description:
    "YESS Bangla Private Limited — international-grade business consulting, IT support, web development, OTT and e-commerce solutions in Bangladesh.",
  authors: [{ name: "YESS Bangla" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "YESS Bangla — Business Consulting & IT Solutions in Bangladesh",
    description:
      "YESS Bangla Private Limited — international-grade business consulting, IT support, web development, OTT and e-commerce solutions in Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <Providers>
          <ClientInit />
          {children}
        </Providers>
      </body>
    </html>
  );
}
