"use client";
import { useEffect, useState } from "react";

export default function Words() {
  const [words, setWords] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/v1/words?limit=10")
      .then(res => res.json())
      .then(data => {
        if(data && data.data) setWords(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">Dictionary</h1>
          <p className="text-neutral-400">Expand your vocabulary.</p>
        </div>
        <input type="text" placeholder="Search words..." 
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none w-64" />
      </div>

      {words.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
          No words found. Database might be empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {words.map((w) => (
            <div key={w.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-amber-400">{w.english}</h3>
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-neutral-300">{w.level}</span>
              </div>
              <p className="text-lg mb-2">{w.turkish}</p>
              <p className="text-sm border-t border-white/10 pt-2 text-neutral-400 italic">
                {w.exampleSentence || "No example provided."}
              </p>
              <button className="mt-4 w-full py-2 bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 rounded-lg text-sm font-medium transition-colors border border-white/5">
                ★ Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
