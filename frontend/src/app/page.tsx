import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-32 pb-20">
      
      {/* 1. HERO SECTION WITH MOCK AI CHAT */}
      <section className="flex flex-col lg:flex-row items-center gap-12 mt-8 lg:mt-16">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-8 animate-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Yapay Zeka Destekli İngilizce Eğitimi
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            Konuşarak ve <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Yapay Zeka ile
            </span> Öğren!
          </h1>
          
          <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
            Sadece gramer ezberleme. Sana özel AI eğitmeninle dilediğin zaman yazış, anında hatalarını gör ve doğal İngilizce konuşmayı keşfet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl text-lg transition-transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] flex justify-center items-center gap-2"
            >
              Hemen Ücretsiz Başla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>

        {/* Right Side: Mock AI Chat UI */}
        <div className="flex-1 w-full max-w-lg relative animate-in slide-in-from-right-8 duration-700">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-6">
            
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">FluentBee AI Tutor</h3>
                <p className="text-xs text-emerald-400">Çevrimiçi</p>
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="space-y-4">
              <div className="flex flex-col items-end gap-1">
                <div className="bg-emerald-500 text-black px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-medium w-auto max-w-[80%] shadow-md">
                  I readed a book yesterday it is very good.
                </div>
                <span className="text-[10px] text-neutral-500 mr-1">Öğrenci • 10:41</span>
              </div>

              <div className="flex flex-col items-start gap-1">
                <div className="bg-white/10 border border-white/5 text-neutral-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm w-auto max-w-[90%] shadow-md space-y-2">
                  <p>Harika bir çaba! Ancak geçmiş zamanda "read" fiilinin düzensiz (irregular) olduğunu unutma.</p>
                  <div className="bg-black/30 p-2 rounded border border-emerald-500/20 text-emerald-300">
                    ✅ I <strong>read</strong> a book yesterday, it <strong>was</strong> very good.
                  </div>
                </div>
                <span className="text-[10px] text-neutral-500 ml-1">AI Tutor • 10:41</span>
              </div>
            </div>
            
            {/* Input mock */}
            <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center text-neutral-500 text-sm">
              <span>Mesajını yaz...</span>
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES GRID */}
      <section className="space-y-12 animate-in fade-in duration-1000">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">İngilizceyi Modern Yöntemlerle Keşfet</h2>
          <p className="text-neutral-400 text-lg">Geleneksel kursların sıkıcı yapısından kurtul. FluentBee seni konuşturmaya odaklanır.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.02] transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sınırsız AI Pratiği</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Utanmadan, çekinmeden dilediğin kadar sohbet et. Yapay zeka gramer analizi yapar ve cümlelerini anında düzeltir.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.02] transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Özelleştirilmiş Dersler</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Seviyene (Beginner'dan Advanced'a) uygun hazırlanmış modüller ve etkileşimli içerikler.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.02] transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Kişisel Sözlük ve Sınavlar</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Öğrendiğin kelimeleri favorilerine ekle. Belirli aralıklarla sınav olarak bilgi birikimini test et ve sertifika kazan!
            </p>
          </div>
        </div>
      </section>
      
      {/* 3. CTA WITH GLASSMORPHISM */}
      <section className="relative rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 p-12 lg:p-20 overflow-hidden isolate">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[40rem] h-[40rem] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Zaman kaybetmeyi bırak, <br/><span className="text-emerald-400">öğrenmeye başla.</span></h2>
            <p className="text-neutral-400 text-lg">FluentBee hesabını saniyeler içinde oluştur ve yapay zeka destekli İngilizce macerana bugün adım at.</p>
          </div>
          <div className="shrink-0 flex gap-4 w-full lg:w-auto">
            <Link href="/register" className="w-full lg:w-auto text-center px-10 py-5 bg-white text-black font-bold rounded-2xl text-lg hover:bg-neutral-200 transition-colors">
              Hemen Kayıt Ol
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
