"use client";
import { useEffect, useState } from "react";

export default function Exams() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/v1/exams?limit=10")
      .then(res => res.json())
      .then(data => {
        if(data && data.data) setExams(data.data);
      })
      .catch(console.error);
  }, []);

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
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{e.title}</h3>
                <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full font-bold">{e.level}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-8">
                <span className="text-neutral-500">Includes reading, writing, and grammar</span>
                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
