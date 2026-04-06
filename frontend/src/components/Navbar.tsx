"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const check = () => setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    check(); // Her route değişiminde ve ilk yüklemede kontrol et

    window.addEventListener("auth-change", check);
    window.addEventListener("storage", check);

    return () => {
      window.removeEventListener("auth-change", check);
      window.removeEventListener("storage", check);
    };
  }, [pathname]); // pathname değişince de kontrol et

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("auth-change"));
    setIsLoggedIn(false);
    toast.success("Çıkış yapıldı.", { icon: '👋' });
    router.push("/");
  };

  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
               </div>
               <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">FluentBee</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-1">
                {[
                  { href: "/lessons", label: "Dersler" },
                  { href: "/words", label: "Sözlük" },
                  { href: "/exams", label: "Sınavlar" },
                ].map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)] border border-emerald-500/30"
                          : "hover:bg-white/10 text-neutral-300 hover:text-white"
                      }`}>
                      {label}
                    </Link>
                  );
                })}
                <Link href="/ai"
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                    pathname === "/ai"
                      ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)] border border-emerald-500/30"
                      : "hover:bg-emerald-500/20 text-emerald-400"
                  }`}>
                  AI Tutor ✨
                </Link>
                {mounted && isLoggedIn && (
                  <Link href="/profile"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pathname === "/profile"
                        ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)] border border-emerald-500/30"
                        : "hover:bg-white/10 text-neutral-300 hover:text-white"
                    }`}>
                    Profil
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!mounted ? null : isLoggedIn ? (
               <button onClick={handleLogout} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                Çıkış Yap
              </button>
            ) : (
              <>
                <Link href="/login" className="text-neutral-300 hover:text-white font-bold transition-colors">
                  Giriş Yap
                </Link>
                <Link href="/register" className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
