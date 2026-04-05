"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Words() {
  const [words, setWords] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5050/v1/words?limit=20`)
      .then(res => res.json())
      .then(data => { if (data?.data) setWords(data.data); })
      .catch(console.error);
  }, []);

  // Kullanıcının favorilerini yükle
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5050/v1/words/favorites?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setFavorites(new Set(data.data.map((w: any) => w.id)));
        }
      })
      .catch(console.error);
  }, [userId]);

  const toggleFavorite = async (wordId: string) => {
    if (!userId) {
      toast.error("Favorilere eklemek için giriş yapmalısın!", { icon: "🔒" });
      return;
    }

    const isFav = favorites.has(wordId);
    setLoading(prev => new Set(prev).add(wordId));

    try {
      const res = await fetch(
        `http://localhost:5050/v1/words/${wordId}/favorite?userId=${userId}`,
        { method: isFav ? "DELETE" : "POST" }
      );

      if (res.ok || res.status === 409) {
        setFavorites(prev => {
          const next = new Set(prev);
          if (isFav) next.delete(wordId);
          else next.add(wordId);
          return next;
        });
        toast.success(isFav ? "Favorilerden çıkarıldı." : "Favorilere eklendi! ⭐", {
          icon: isFav ? "💔" : "⭐",
        });
      } else {
        toast.error("Bir hata oluştu.");
      }
    } catch {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(prev => { const next = new Set(prev); next.delete(wordId); return next; });
    }
  };

  const filtered = words.filter(w =>
    w.english?.toLowerCase().includes(search.toLowerCase()) ||
    w.turkish?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">Dictionary</h1>
          <p className="text-neutral-400">Expand your vocabulary.</p>
        </div>
        <input
          type="text"
          placeholder="Search words..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
          No words found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => {
            const isFav = favorites.has(w.id);
            const isLoading = loading.has(w.id);
            return (
              <div key={w.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-amber-400">{w.english}</h3>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-neutral-300">{w.level}</span>
                </div>
                <p className="text-lg mb-2">{w.turkish}</p>
                <p className="text-sm border-t border-white/10 pt-2 text-neutral-400 italic">
                  {w.exampleSentence || "No example provided."}
                </p>
                <button
                  onClick={() => toggleFavorite(w.id)}
                  disabled={isLoading}
                  className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all border flex items-center justify-center gap-2
                    ${isFav
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                      : "bg-white/5 border-white/5 hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className={`transition-transform ${isFav ? "scale-110" : ""}`}>
                    {isFav ? "★" : "☆"}
                  </span>
                  {isLoading ? "Yükleniyor..." : isFav ? "Favorilerde" : "Add to Favorites"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
