"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5050/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", `${data.user.firstName} ${data.user.lastName}`);
        window.dispatchEvent(new Event("auth-change"));
        toast.success("Tekrar hoş geldin!", { icon: '👋' });
        router.push("/profile");
      } else {
        toast.error("E-posta veya şifre hatalı.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background details */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl mb-6 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>

                <h2 className="text-3xl font-bold mb-2 text-center text-white tracking-tight">Tekrar Hoş Geldin!</h2>
                <p className="text-center text-neutral-400 mb-8 text-sm">Gelişimini görmek ve AI pratiklerine devam etmek için giriş yap.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-300 mb-1">E-Posta</label>
                        <input type="email" required placeholder="ornek@posta.com"
                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                            onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-semibold text-neutral-300">Şifre</label>
                            <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Şifremi Unuttum</Link>
                        </div>
                        <input type="password" required placeholder="••••••••"
                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>
                    
                    <button type="submit" 
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl px-4 py-3 mt-4 transition-all shadow-[0_5px_20px_-5px_rgba(16,185,129,0.5)] flex justify-center items-center gap-2">
                        Giriş Yap
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-6 font-medium">
                    Hesabın yok mu? <Link href="/register" className="text-white hover:text-emerald-400 transition-colors">Ücretsiz Kayıt Ol</Link>
                </p>
            </div>
        </div>
    </div>
  );
}
