import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-50`}>
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  FluentBee
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex items-baseline space-x-4">
                    <Link href="/lessons" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Lessons</Link>
                    <Link href="/words" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Dictionary</Link>
                    <Link href="/profile" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Profile</Link>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
