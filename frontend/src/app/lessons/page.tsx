"use client";
import { useEffect, useState } from "react";

export default function Lessons() {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/v1/lessons?limit=10")
      .then(res => res.json())
      .then(data => {
        if(data && data.data) setLessons(data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">Lessons</h1>
          <p className="text-neutral-400">Structured courses for all levels.</p>
        </div>
        <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none w-48 text-neutral-300">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
        </select>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
          No lessons found. Database might be empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((l) => (
            <div key={l.id} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{l.title}</h3>
                <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full">{l.level}</span>
              </div>
              <p className="text-neutral-400 mb-6">{l.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-500">⏱ {l.durationMinutes} minutes</span>
                <button className="px-4 py-2 bg-white/10 hover:bg-amber-500 hover:text-black rounded-lg font-bold transition-colors">
                  Start Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
