import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blink & Miss — AI Live Cricket Companion",
  description: "Never miss crucial cricket moments. Live simulation, intelligent checkpoints, turning point detection, and Gemini AI insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-charcoal-900 text-slate-100 antialiased selection:bg-lime selection:text-charcoal-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}
