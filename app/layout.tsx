import type { Metadata } from "next";
import {
  Geist_Mono,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

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
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <Navbar />
        {/* Floating Scroll Indicator (Left Side) */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium tracking-widest hidden lg:block z-50">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-navy animate-pulse" />
            Scroll
          </span>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
