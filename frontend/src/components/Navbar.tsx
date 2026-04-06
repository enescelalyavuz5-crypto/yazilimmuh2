"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [goal, setGoal] = useState<number | null>(null);
  const [spentSeconds, setSpentSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const toastFiredRef = useRef(false);
  const goalRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // goalRef her zaman güncel goal değerini tutar
  useEffect(() => {
    goalRef.current = goal;
  }, [goal]);

  const fetchGoal = useCallback(async () => {
    const uId = localStorage.getItem("userId");
    if (!uId) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${uId}`);
      const data = await res.json();
      if (data.dailyGoalMinutes) setGoal(data.dailyGoalMinutes);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    check();

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
  }, [pathname, fetchGoal]);

  // DAILY GOAL TRACKER — saniye sayıcı
  useEffect(() => {
    if (!isLoggedIn || !goal) return;

    if (timerRef.current) clearInterval(timerRef.current);
    toastFiredRef.current = false;

    const today = new Date().toISOString().split("T")[0];
    const storageKey = `study_seconds_${today}`;

    const savedSeconds = parseInt(localStorage.getItem(storageKey) || "0");
    setSpentSeconds(savedSeconds);
    if (savedSeconds >= goal * 60) toastFiredRef.current = true;

    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSpentSeconds(prev => {
        const next = prev + 1;
        localStorage.setItem(storageKey, next.toString());

        const currentGoal = goalRef.current;
        if (!toastFiredRef.current && currentGoal && next >= currentGoal * 60) {
          toastFiredRef.current = true;
          toast.success(`🏆 Günlük hedefe ulaştın! ${currentGoal} dakika tamamlandı!`, {
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
  }, [isLoggedIn, goal, isActive]);

  const resetTimer = () => {
    if (!window.confirm("Günün çalışma süresini sıfırlamak istediğinden emin misin?")) return;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`study_seconds_${today}`, "0");
    setSpentSeconds(0);
    toastFiredRef.current = false;
    toast.success("Sayaç sıfırlandı.");
  };

  const handleLogout = () => {
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

  // Timer hesaplamaları
  const totalGoalSeconds = goal ? goal * 60 : 0;
  const progressPercent = goal ? Math.min((spentSeconds / totalGoalSeconds) * 100, 100) : 0;
  const mins = Math.floor(spentSeconds / 60);
  const secs = spentSeconds % 60;
  const done = goal ? spentSeconds >= totalGoalSeconds : false;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <>
      <nav className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sol: Logo + Linkler */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  FluentBee
                </span>
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

            {/* Sağ: Timer + Butonlar */}
            <div className="flex items-center gap-4">

              {/* --- GÜNLÜK HEDEF SAYACI KALDIRILDI, FLOATING EKLENDI --- */}

              {!mounted ? null : isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  Çıkış Yap
                </button>
              ) : (
                <>
                  <Link href="/login" className="text-neutral-300 hover:text-white font-bold transition-colors">
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navbar altı ince progress bar — tam genişlik */}
        {mounted && isLoggedIn && goal && (
          <div className="h-0.5 w-full bg-white/5">
            <div
              className="h-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: done
                  ? "linear-gradient(90deg,#10B981,#34d399)"
                  : "linear-gradient(90deg,#f59e0b,#fbbf24)",
              }}
            />
          </div>
        )}
      </nav>

      {/* --- DEV KRONOMETRE WIDGET (FLOATING) --- */}
      {mounted && isLoggedIn && goal && (
        <div className={`fixed bottom-6 right-6 z-[100] flex flex-col items-center bg-black/80 backdrop-blur-xl border-2 p-5 rounded-[2.5rem] transition-all duration-500 hover:scale-105 ${
          done 
            ? "border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]" 
            : "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
        }`}>
          <div className="text-center mb-3">
             <p className="text-[11px] font-black uppercase tracking-widest text-neutral-400">
               {done ? "🔥 HEDEF TAMAM!" : "ÇALIŞMA SAYACI"}
             </p>
          </div>
          
          {/* Stopwatch Display */}
          <div className="relative w-32 h-32 flex items-center justify-center bg-black/50 rounded-full border-[6px] border-white/5 mx-auto mb-4">
             {/* Background Track */}
             <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="46" fill="none" strokeWidth="6" stroke="rgba(255,255,255,0.05)" />
                 {/* Foreground Progress */}
                 <circle cx="50" cy="50" r="46" fill="none" strokeWidth="6" 
                    stroke={done ? "#10B981" : "#f59e0b"} 
                    strokeLinecap="round" 
                    strokeDasharray={2 * Math.PI * 46} 
                    strokeDashoffset={2 * Math.PI * 46 * (1 - progressPercent / 100)} 
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                 />
             </svg>
             
             {/* Time Text */}
             <div className={`text-4xl font-black font-mono tracking-tighter z-10 ${done ? "text-emerald-400" : "text-amber-400"} filter drop-shadow-[0_0_10px_rgba(0,0,0,1)]`}>
               {timeStr}
             </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mb-4">
             <button 
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" 
                    : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                }`}
                title={isActive ? "Durdur" : "Başlat"}
             >
                {isActive ? (
                  <svg className="w-6 h-6 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-6 h-6 ml-1 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
             </button>
             <button 
                type="button"
                onClick={resetTimer}
                className="w-12 h-12 rounded-full bg-white/5 text-neutral-400 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-all"
                title="Sıfırla"
             >
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
             </button>
          </div>

          {/* Goal Display */}
          <div className="bg-white/10 px-5 py-2 rounded-full border border-white/5">
            <span className="text-sm font-bold text-white tracking-wide">
              Hedef: <span className={done ? "text-emerald-400" : "text-amber-400"}>{goal} dk</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
