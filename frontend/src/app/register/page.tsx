"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    englishLevel: "beginner"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.id || data.user?.id);
        localStorage.setItem("userName", `${data.firstName || data.user?.firstName} ${data.lastName || data.user?.lastName}`);
        localStorage.setItem("userEmail", data.email || data.user?.email);
        window.dispatchEvent(new Event("auth-change"));
        toast.success("Kayıt Başarılı! Öğrenme yolculuğuna hoş geldin.", { icon: '🎓' });
        router.push("/profile");
      } else {
        toast.error("Kayıt işlemi başarısız oldu. Girdiğin bilgileri kontrol et.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-[#0A0A0A] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-3 text-white tracking-tight">Ücretsiz Hesap Oluştur</h2>
            <p className="text-neutral-400 text-sm md:text-base">Hemen aramıza katıl ve AI desteki İngilizce platformunun avantajlarından faydalan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-neutral-300">Ad</label>
                <input type="text" required placeholder="Adın"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-neutral-300">Soyad</label>
                <input type="text" required placeholder="Soyadın"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-neutral-300">E-Posta Adresi</label>
              <input type="email" required placeholder="ornek@posta.com"
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-neutral-300">Şifre</label>
              <input type="password" required placeholder="En az 8 karakter"
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-neutral-600"
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-neutral-300">İngilizce Seviyen</label>
              <select 
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
                onChange={(e) => setFormData({...formData, englishLevel: e.target.value})}>
                <option value="beginner">Başlangıç (Beginner A1-A2)</option>
                <option value="intermediate">Orta (Intermediate B1-B2)</option>
                <option value="advanced">İleri (Advanced C1)</option>
              </select>
            </div>

            <button type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl px-4 py-4 mt-8 transition-all shadow-[0_5px_20px_-5px_rgba(16,185,129,0.5)] flex justify-center items-center gap-2 group">
              FluentBee'ye Katıl
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-8 font-medium">
              Zaten hesabın var mı? <Link href="/login" className="text-white hover:text-emerald-400 transition-colors">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
