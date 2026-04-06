import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentBee - Learn English Fast",
  description: "Modern English Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-50`} suppressHydrationWarning>
        <Toaster position="top-center" toastOptions={{ style: { background: '#171717', color: '#fff', border: '1px solid #333' } }} />
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <footer className="border-t border-white/10 bg-[#050505] py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    FluentBee
                </h3>
                <p className="text-neutral-400 text-sm">Yazılım Mühendisliği dersi kapsamında geliştirilen İngilizce öğrenme platformu prototipi. Yapay zeka, kurslar ve sözlük modülleri içerir.</p>
              </div>
              <div className="md:justify-self-end">
                <h4 className="font-bold mb-4 text-white">Proje Modülleri</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li><Link href="/lessons" className="hover:text-emerald-400 transition-colors">Dersler</Link></li>
                  <li><Link href="/words" className="hover:text-emerald-400 transition-colors">Sözlük</Link></li>
                  <li><Link href="/ai" className="hover:text-emerald-400 transition-colors">AI Pratik Eğitmeni</Link></li>
                  <li><Link href="/exams" className="hover:text-emerald-400 transition-colors">Sınavlar</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
              <div>© {new Date().getFullYear()} FluentBee. Tüm hakları saklıdır.</div>
              <div className="mt-4 md:mt-0">
                Geliştiriciler: <strong>Enes Celal Yavuz</strong> &amp; <strong>Ali Şeker</strong>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


