"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goal, setGoal] = useState<number | null>(null);
  const [spentSeconds, setSpentSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const toastFiredRef = useRef(false);
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

  // DAILY GOAL TRACKER — saniye sayıcı
  useEffect(() => {
    if (!isLoggedIn || !goal) return;

    if (timerRef.current) clearInterval(timerRef.current);
    toastFiredRef.current = false;

    const today = new Date().toISOString().split("T")[0];
    const storageKey = `study_seconds_${today}`;

    // Geçen oturumdan kalan süreyi yükle
    const savedSeconds = parseInt(localStorage.getItem(storageKey) || "0");
    setSpentSeconds(savedSeconds);
    if (savedSeconds >= goal * 60) toastFiredRef.current = true;

    timerRef.current = setInterval(() => {
      setSpentSeconds(prev => {
        const next = prev + 1;
        localStorage.setItem(storageKey, next.toString());

        // Hedefe ulaşıldığında toast göster (sadece 1 kez)
        if (!toastFiredRef.current && goal && next >= goal * 60) {
          toastFiredRef.current = true;
          toast.success(`🏆 Günlük hedefe ulaştın! ${goal} dakika tamamlandı!`, {
            duration: 10000,
            style: { background: '#10B981', color: '#000', fontWeight: 'bold', fontSize: '15px' }
          });
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoggedIn, goal]);

  // Logout temizleme
  const handleLogout = () => {
    // Tüm kullanıcı verilerini temizle
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.dispatchEvent(new Event("auth-change"));
    setIsLoggedIn(false);
    setGoal(null);
    setSpentSeconds(0);
    toastFiredRef.current = false;
    toast.success("Çıkış yapıldı.", { icon: '👋' });
    router.push("/");
  };

  return (
    <>
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

    {/* Floating Study Timer Widget */}
    {mounted && isLoggedIn && goal && (
      (() => {
        const totalGoalSeconds = goal * 60;
        const mins = Math.floor(spentSeconds / 60);
        const secs = spentSeconds % 60;
        const progress = Math.min(spentSeconds / totalGoalSeconds, 1);
        const done = spentSeconds >= totalGoalSeconds;
        const circumference = 2 * Math.PI * 20; // r=20
        return (
          <div
            className={`fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5 select-none
              px-4 py-3 rounded-2xl backdrop-blur-md border shadow-2xl transition-all duration-500
              ${ done
                ? 'bg-emerald-500/20 border-emerald-400/50 shadow-emerald-500/20'
                : 'bg-black/70 border-white/10'
              }`}
            style={{ minWidth: 90 }}
          >
            {/* Ring Progress */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                {/* Track */}
                <circle cx="24" cy="24" r="20" fill="none" strokeWidth="4"
                  className="stroke-white/10" />
                {/* Progress */}
                <circle cx="24" cy="24" r="20" fill="none" strokeWidth="4"
                  stroke={done ? '#10B981' : '#f59e0b'}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <span className="text-xs font-black z-10" style={{ color: done ? '#10B981' : '#f59e0b' }}>
                {done ? '✓' : `${mins}:${secs.toString().padStart(2, '0')}`}
              </span>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: done ? '#10B981' : '#9ca3af' }}>
                {done ? 'Hedefe Ulaştın!' : 'Günlük Hedef'}
              </p>
              <p className="text-[10px] text-neutral-500">{goal} dk hedef</p>
            </div>
          </div>
        );
      })()
    )}
  </>);
}
