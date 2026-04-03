import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Master English with <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">AI Power</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto">
          FluentBee helps you learn vocabulary, complete lessons, and practice with AI to perfect your grammar and speaking.
        </p>
      </div>

      <div className="flex gap-4 pt-8">
        <Link 
          href="/register" 
          className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
        >
          Start Learning Free
        </Link>
        <Link 
          href="/lessons" 
          className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-lg transition-all hover:scale-105 backdrop-blur-sm border border-white/10"
        >
          Browse Lessons
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 w-full max-w-5xl">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-amber-400 text-3xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Smart Vocabulary</h3>
          <p className="text-neutral-400">Save your favorite words and track your memorization progress easily.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="text-amber-400 text-3xl mb-4">🎓</div>
          <h3 className="text-xl font-bold mb-2">Structured Lessons</h3>
          <p className="text-neutral-400">Follow a clear path from beginner to advanced with our structured courses.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="text-amber-400 text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Practice</h3>
          <p className="text-neutral-400">Practice your writing and get instant AI feedback on grammar and vocabulary.</p>
        </div>
      </div>
    </div>
  );
}
