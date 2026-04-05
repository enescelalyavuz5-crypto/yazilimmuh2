"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Lesson = { id: string; title: string; description: string; content: string; level: string; durationMinutes: number };

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-500/20 text-emerald-400",
  intermediate: "bg-amber-500/20 text-amber-400",
  advanced: "bg-red-500/20 text-red-400",
};

// Basit markdown renderer
function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-3 border-b border-white/10 pb-2">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-bold text-amber-400 mt-6 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("#### ")) return <h4 key={i} className="text-base font-bold text-cyan-400 mt-4 mb-1">{line.slice(5)}</h4>;
      if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-amber-500 pl-4 my-3 text-amber-200/80 italic">{line.slice(2)}</blockquote>;
      if (line.startsWith("| ")) {
        const cells = line.split("|").filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^-+$/))) return null; // separator
        return <tr key={i}>{cells.map((c, j) => <td key={j} className="border border-white/10 px-3 py-2 text-sm">{renderInline(c.trim())}</td>)}</tr>;
      }
      if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-neutral-300 list-disc">{renderInline(line.slice(2))}</li>;
      if (/^\d+\. /.test(line)) return <li key={i} className="ml-4 mb-1 text-neutral-300 list-decimal">{renderInline(line.replace(/^\d+\. /, ""))}</li>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-neutral-300 leading-relaxed mb-1">{renderInline(line)}</p>;
    });
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i} className="text-neutral-200 italic">{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
}

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [levelFilter, setLevelFilter] = useState("");
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const url = levelFilter
      ? `http://localhost:5050/v1/lessons?limit=10&level=${levelFilter}`
      : "http://localhost:5050/v1/lessons?limit=10";
    fetch(url)
      .then(res => res.json())
      .then(data => { if (data?.data) setLessons(data.data); })
      .catch(console.error);
  }, [levelFilter]);

  const openLesson = async (id: string) => {
    setLoading(true);
    setCompleted(false);
    try {
      const res = await fetch(`http://localhost:5050/v1/lessons/${id}`);
      const data = await res.json();
      setActiveLesson(data);
    } catch {
      console.error("Ders yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const completeLesson = async () => {
    if (!activeLesson) return;
    if (!userId) {
      toast.error("Dersi tamamlamak için giriş yapmalısın!", { icon: "🔒" });
      return;
    }
    setCompleting(true);
    try {
      const res = await fetch(
        `http://localhost:5050/v1/lessons/${activeLesson.id}/complete?userId=${userId}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (data.alreadyCompleted) {
        toast("Bu dersi zaten tamamlamıştın! ✅", { icon: "ℹ️" });
      } else {
        toast.success("Tebrikler! Ders tamamlandı! 🎉");
        setCompleted(true);
      }
    } catch {
      toast.error("Bir hata oluştu.");
    } finally {
      setCompleting(false);
    }
  };

  // --- DERS OKUMA EKRANI ---
  if (activeLesson) {
    const hasContent = activeLesson.content && activeLesson.content.trim().length > 0;
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <button onClick={() => setActiveLesson(null)}
          className="mb-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium">
          ← Derslere Dön
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${levelColors[activeLesson.level] || "bg-white/10 text-white"}`}>
              {activeLesson.level}
            </span>
            <span className="text-xs text-neutral-500">⏱ {activeLesson.durationMinutes} min</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h1>
          <p className="text-neutral-400">{activeLesson.description}</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          {hasContent ? (
            <div className="prose-custom">
              <table className="hidden" />{/* table wrapper hack */}
              {(() => {
                const rendered = renderMarkdown(activeLesson.content);
                // Wrap consecutive <tr> in a <table>
                const result: React.ReactNode[] = [];
                let tableRows: React.ReactNode[] = [];
                rendered.forEach((el: any, i) => {
                  if (el?.type === "tr") {
                    tableRows.push(el);
                  } else {
                    if (tableRows.length > 0) {
                      result.push(
                        <div key={`table-${i}`} className="overflow-x-auto my-4">
                          <table className="w-full border-collapse text-sm">
                            <tbody>{tableRows}</tbody>
                          </table>
                        </div>
                      );
                      tableRows = [];
                    }
                    if (el) result.push(el);
                  }
                });
                if (tableRows.length > 0) {
                  result.push(
                    <div key="table-end" className="overflow-x-auto my-4">
                      <table className="w-full border-collapse text-sm"><tbody>{tableRows}</tbody></table>
                    </div>
                  );
                }
                return result;
              })()}
            </div>
          ) : (
            <p className="text-neutral-500 italic text-center py-8">Bu ders için içerik henüz eklenmemiş.</p>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={() => setActiveLesson(null)}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all">
            ← Derslere Dön
          </button>
          <button
            onClick={completeLesson}
            disabled={completing || completed}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              completed
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default"
                : "bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-50"
            }`}>
            {completing ? "Kaydediliyor..." : completed ? "✓ Tamamlandı!" : "✓ Dersi Tamamladım"}
          </button>
        </div>
      </div>
    );
  }

  // --- DERS LİSTESİ ---
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">Lessons</h1>
          <p className="text-neutral-400">Structured courses for all levels.</p>
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none w-48 text-neutral-300">
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
          No lessons found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((l) => (
            <div key={l.id} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors">{l.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-bold flex-shrink-0 ml-2 ${levelColors[l.level] || "bg-white/10 text-white"}`}>
                  {l.level}
                </span>
              </div>
              <p className="text-neutral-400 mb-6 text-sm leading-relaxed">{l.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500">⏱ {l.durationMinutes} minutes</span>
                <button onClick={() => openLesson(l.id)} disabled={loading}
                  className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-400 rounded-lg font-bold transition-all disabled:opacity-50">
                  {loading ? "Yükleniyor..." : "Start Lesson →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
