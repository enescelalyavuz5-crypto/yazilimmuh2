"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Question = { question: string; options: string[]; correctAnswer: string };
type ExamData = { examId: string; examTitle: string; level: string; questions: Question[] };
type ResultData = { score: number; correct: number; total: number; passed: boolean };

export default function Exams() {
  const [exams, setExams] = useState<any[]>([]);
  const [activeExam, setActiveExam] = useState<ExamData | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}`}/v1/exams?limit=10`)
      .then(res => res.json())
      .then(data => { if (data?.data) setExams(data.data); })
      .catch(console.error);
  }, []);

  const startExam = async (examId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/exams/${examId}/questions`);
      const data = await res.json();
      setActiveExam(data);
      setAnswers([]);
      setCurrentQ(0);
      setResult(null);
    } catch {
      toast.error("Sınav yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = option;
    setAnswers(newAnswers);
  };

  const submitExam = async () => {
    if (!activeExam) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/exams/${activeExam.examId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId || "00000000-0000-0000-0000-000000000000",
          answers
        })
      });
      const data = await res.json();
      setResult(data);
    } catch {
      toast.error("Sınav gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  // --- SONUÇ EKRANI ---
  if (result && activeExam) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in duration-500 py-12">
        <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center text-5xl font-black border-4 shadow-2xl ${
          result.passed
            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-emerald-500/20"
            : "bg-red-500/20 border-red-500 text-red-400 shadow-red-500/20"
        }`}>
          {result.score}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{result.passed ? "🎉 Tebrikler! Geçtin!" : "😔 Başaramadın"}</h2>
          <p className="text-neutral-400">{activeExam.examTitle}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl font-black text-white">{result.score}</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Puan</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl font-black text-emerald-400">{result.correct}</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Doğru</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-3xl font-black text-red-400">{result.total - result.correct}</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Yanlış</div>
          </div>
        </div>
        {result.passed && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
            ✅ Sertifikan profil sayfana kaydedildi!
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <button onClick={() => { setResult(null); setActiveExam(null); }}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all">
            ← Sınavlara Dön
          </button>
          <button onClick={() => startExam(activeExam.examId)}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-bold transition-all">
            🔄 Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  // --- SINAV EKRANI ---
  if (activeExam) {
    const q = activeExam.questions[currentQ];
    const progress = ((currentQ + 1) / activeExam.questions.length) * 100;
    const answered = answers[currentQ];
    const allAnswered = answers.length === activeExam.questions.length && answers.every(a => a);

    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-cyan-400">{activeExam.examTitle}</h2>
            <span className="text-sm text-neutral-400">{currentQ + 1} / {activeExam.questions.length}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-cyan-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Soru */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-xl font-semibold mb-8 leading-relaxed">{q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => selectAnswer(opt)}
                className={`w-full text-left px-5 py-4 rounded-xl border font-medium transition-all duration-150 ${
                  answered === opt
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}>
                <span className="text-neutral-500 mr-3">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigasyon */}
        <div className="flex justify-between items-center">
          <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold disabled:opacity-30 transition-all">
            ← Önceki
          </button>

          <div className="flex gap-1">
            {activeExam.questions.map((_, i) => (
              <button key={i} onClick={() => setCurrentQ(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  i === currentQ ? "bg-cyan-500 text-black" : answers[i] ? "bg-emerald-500/40 text-emerald-300" : "bg-white/10 text-neutral-400"
                }`}>{i + 1}</button>
            ))}
          </div>

          {currentQ < activeExam.questions.length - 1 ? (
            <button onClick={() => setCurrentQ(q => q + 1)} disabled={!answered}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-bold disabled:opacity-30 transition-all">
              Sonraki →
            </button>
          ) : (
            <button onClick={submitExam} disabled={!allAnswered || loading}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-bold disabled:opacity-30 transition-all">
              {loading ? "Gönderiliyor..." : "Sınavı Bitir ✓"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- SINAV LİSTESİ ---
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">Certification Exams</h1>
          <p className="text-neutral-400">Test your knowledge and earn certificates.</p>
        </div>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
          No exams found. Database might be empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((e) => (
            <div key={e.id} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{e.title}</h3>
                <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full font-bold">{e.level}</span>
              </div>
              <p className="text-sm text-neutral-500 mb-6">5 soruluk çoktan seçmeli sınav • Geçme notu: 60</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">📝 Grammar & Vocabulary</span>
                <button onClick={() => startExam(e.id)} disabled={loading}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50">
                  {loading ? "Yükleniyor..." : "Start Exam →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
