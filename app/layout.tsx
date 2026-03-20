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
  title: "Maroof Shittu | Reclusive Sloth",
  description: "Maroof Shittu's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
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
      </body>
    </html>
  );
}
