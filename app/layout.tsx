// app/layout.tsx
import type { Metadata } from "next";
// 1. Impor font yang kita inginkan
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 2. Konfigurasi font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Berat font yang akan digunakan
  variable: '--font-poppins',   // Nama variabel CSS
});

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  // ... (metadata Anda)
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    // 3. Terapkan font ke seluruh halaman
    <html lang="id" className={`${poppins.variable} ${lato.variable}`}>
      <body className="flex flex-col min-h-screen font-lato"> {/* Font default untuk body */}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}