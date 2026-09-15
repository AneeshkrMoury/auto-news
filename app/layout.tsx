import { Newsreader, Archivo, IBM_Plex_Mono } from "next/font/google";

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}