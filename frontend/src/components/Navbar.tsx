"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goal, setGoal] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const check = () => setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    check(); // Her route değişiminde ve ilk yüklemede kontrol et

    const fetchGoal = async () => {
      const uId = localStorage.getItem("userId");
      if (!uId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${uId}`);
        const data = await res.json();
        if (data.dailyGoalMinutes) setGoal(data.dailyGoalMinutes);
      } catch (e) {
        console.error(e);
      }
    };

    if (localStorage.getItem("isLoggedIn") === "true") {
      fetchGoal();
    }

    const onStorageOrAuth = () => {
      check();
      if (localStorage.getItem("isLoggedIn") === "true") fetchGoal();
    };

    window.addEventListener("auth-change", onStorageOrAuth);
    window.addEventListener("storage", onStorageOrAuth);
    window.addEventListener("goal-updated", fetchGoal);

    return () => {
      window.removeEventListener("auth-change", onStorageOrAuth);
      window.removeEventListener("storage", onStorageOrAuth);
      window.removeEventListener("goal-updated", fetchGoal);
    };
  }, [pathname]);

  // DAILY GOAL TRACKER
  useEffect(() => {
    if (!isLoggedIn || !goal) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const storageKey = `study_spent_${today}`;
    
    timerRef.current = setInterval(() => {
      let spent = parseInt(localStorage.getItem(storageKey) || "0");
      spent += 1;
      localStorage.setItem(storageKey, spent.toString());

      if (spent === goal) {
        toast.success(`Harika! Günlük hedefin olan ${goal} dakikaya ulaştın! 🎉`, {
          icon: '🏆',
          duration: 8000,
          style: { background: '#10B981', color: '#000', fontWeight: 'bold' }
        });
      }
    }, 60000); // 1 minute

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoggedIn, goal]); // pathname değişince de kontrol et

  const handleLogout = () => {
    // Tüm kullanıcı verilerini temizle
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.dispatchEvent(new Event("auth-change"));
    setIsLoggedIn(false);
    setGoal(null);
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
