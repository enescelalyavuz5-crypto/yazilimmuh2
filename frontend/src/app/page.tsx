import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col space-y-24 animate-in fade-in slide-in-from-bottom-5 duration-1000 pb-20">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center mt-12 space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          FluentBee v1.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Master English with <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">AI Power</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400">
          FluentBee helps you learn vocabulary, complete lessons, and practice with AI to perfect your grammar and speaking abilities faster than ever before.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex-1 sm:flex-none text-center"
          >
            Start Learning Free
          </Link>
          <Link 
            href="/lessons" 
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-lg transition-all hover:scale-105 backdrop-blur-sm border border-white/10 flex-1 sm:flex-none text-center"
          >
            Browse Lessons
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">How FluentBee Works</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Your journey to fluency is structured in three simple, effective steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl font-bold mb-6">1</div>
            <h3 className="text-xl font-bold mb-3">Take Structured Lessons</h3>
            <p className="text-neutral-400 leading-relaxed">Start from your current level and follow our curated curriculum. Learn grammar rules, speaking tips, and cultural contexts.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold mb-6">2</div>
            <h3 className="text-xl font-bold mb-3">Build Your Dictionary</h3>
            <p className="text-neutral-400 leading-relaxed">Discover new words, add them to your personal favorites, and use our spaced repetition tools to memorize them permanently.</p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 rounded-xl relative z-10 bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold mb-6">3</div>
            <h3 className="text-xl font-bold mb-3 relative z-10">Practice with AI Tutor</h3>
            <p className="text-neutral-400 leading-relaxed relative z-10">Don't just learn passively. Write sentences and chat with our AI to get instant feedback on your grammar and vocabulary.</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-2">10k+</div>
            <div className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Active Students</div>
          </div>
          <div>
            <div className="text-4xl font-black text-amber-400 mb-2">500+</div>
            <div className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Lessons Available</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">50k+</div>
            <div className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Words Memorized</div>
          </div>
          <div>
            <div className="text-4xl font-black text-emerald-400 mb-2">24/7</div>
            <div className="text-sm text-neutral-400 font-bold uppercase tracking-wider">AI Practice</div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="p-12 rounded-3xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-amber-500/30 text-center space-y-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to speak fluently?</h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">Join thousands of students who have already improved their English skills with FluentBee.</p>
          <Link href="/register" className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
