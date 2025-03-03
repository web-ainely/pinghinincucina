import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// 🔹 1️⃣ Definiamo i font personalizzati
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔹 2️⃣ Metadati della pagina
export const metadata: Metadata = {
  title: "PinghinInCucina",
  description: "Ricettario pinghino!",
};

// 🔹 3️⃣ Creiamo il layout globale
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 🔹 4️⃣ Header con menu di navigazione */}
        <header className="bg-rosa text-white p-4 text-center shadow-md">
          <h1 className="text-3xl font-bold">PinghinInCucina</h1>
          <nav className="mt-4 flex justify-center space-x-6">
            <Link href="/">Home</Link>
            <Link href="/primi">Primi</Link>
            <Link href="/secondi">Secondi</Link>
            <Link href="/dolci">Dolci</Link>
          </nav>
        </header>

        {/* 🔹 5️⃣ Contenuto dinamico della pagina */}
        <main className="p-6">{children}</main>

        {/* 🔹 6️⃣ Footer visibile su tutte le pagine */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-10">
          © 2024 PinghinInCucina - Tutti i diritti riservati.
        </footer>
      </body>
    </html>
  );
}
