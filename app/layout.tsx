import "./globals.css";
import { Newsreader, Archivo, IBM_Plex_Mono } from "next/font/google";

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-mono" });

// Editions only publish twice a day, but pages were fully caching on
// first render (Next.js defaults to caching Server Component fetches
// indefinitely) — every visit after the first was serving stale data.
// 5 minutes is far more often than content actually changes, without
// hitting Supabase on every single page view.
export const revalidate = 300;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  // ...any existing fields...
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};