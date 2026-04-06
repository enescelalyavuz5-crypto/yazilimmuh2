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
  }, [isLoggedIn, goal]);

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

              {/* --- GÜNLÜK HEDEF SAYACI --- */}
              {mounted && isLoggedIn && goal && (
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-500 ${
                    done
                      ? "bg-emerald-500/15 border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "bg-amber-500/10 border-amber-500/30"
                  }`}
                >
                  {/* Radyal progress mini ring */}
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3"
                        stroke={done ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"} />
                      <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3"
                        stroke={done ? "#10B981" : "#f59e0b"}
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 15}
                        strokeDashoffset={2 * Math.PI * 15 * (1 - progressPercent / 100)}
                        style={{ transition: "stroke-dashoffset 0.8s ease" }}
                      />
                    </svg>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[9px] font-black"
                      style={{ color: done ? "#10B981" : "#f59e0b" }}
                    >
                      {done ? "✓" : `${Math.round(progressPercent)}%`}
                    </span>
                  </div>

                  {/* Metin bilgisi */}
                  <div className="flex flex-col leading-tight min-w-0">
                    <span
                      className="text-xs font-black tracking-wide"
                      style={{ color: done ? "#10B981" : "#f59e0b" }}
                    >
                      {done ? "🏆 Tamamlandı!" : `⏱ ${timeStr}`}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {done
                        ? `${goal} dk hedef aşıldı`
                        : `/ ${goal} dk hedef`}
                    </span>
                  </div>

                  {/* Progress bar — tam genişlikte */}
                  <div className="hidden sm:block w-20 h-1.5 rounded-full overflow-hidden bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${progressPercent}%`,
                        background: done
                          ? "linear-gradient(90deg,#10B981,#34d399)"
                          : "linear-gradient(90deg,#f59e0b,#fbbf24)",
                        boxShadow: done
                          ? "0 0 8px rgba(16,185,129,0.6)"
                          : "0 0 8px rgba(245,158,11,0.5)"
                      }}
                    />
                  </div>
                </div>
              )}
              {/* ----------------------------- */}

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
    </>
  );
}
