import type { Metadata } from "next";
import {
  Geist_Mono,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maroof Shittu | Software Engineer",
  description:
    "Maroof Shittu's personal website, Maroof is a reclusive sloth who builds cool stuff",
};

/**
 * RootLayout Component
 *
 * The foundational layout wrapper for the entire Next.js application.
 * It configures global fonts, sets up the HTML structure, injects global styles,
 * and wraps all nested pages with common UI elements like the navbar,
 * scroll indicator, and necessary context providers.
 *
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The nested active page routes to be rendered.
 * @returns {JSX.Element} The global HTML document layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        {/* Floating Scroll Indicator (Left Side) */}
        <ScrollIndicator />
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
