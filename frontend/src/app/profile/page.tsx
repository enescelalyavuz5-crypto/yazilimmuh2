"use client";
import { useEffect, useState } from "react";

export default function Profile() {
  const [stats, setStats] = useState({ memorizedWordsCount: 0, completedLessonsCount: 0 });
  const [goal, setGoal] = useState(30);

  // In a real app we'd get the logged in user ID from context/session
  const dummyUserId = "00000000-0000-0000-0000-000000000000";

  useEffect(() => {
    // We mock the user ID here
    fetch(`http://localhost:5000/v1/users/${dummyUserId}/statistics`)
      .then(res => res.json())
      .then(data => {
        if(data && typeof data.memorizedWordsCount !== "undefined") {
            setStats(data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-6 pb-8 border-b border-white/10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
          EC
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">Enes Celal Yavuz</h1>
          <p className="text-neutral-400">Intermediate Level learner</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-amber-400">📊</span> Learning Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-4xl font-black text-white mb-2">{stats.memorizedWordsCount}</div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider font-bold">Memorized Words</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-4xl font-black text-white mb-2">{stats.completedLessonsCount}</div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider font-bold">Completed Lessons</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-amber-400">⚙️</span> Profile Settings
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Daily Study Goal (Minutes)</label>
              <div className="flex gap-2">
                <input type="number" value={goal} onChange={e=>setGoal(parseInt(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none" />
                <button className="bg-white/10 hover:bg-amber-500 hover:text-black font-bold px-4 py-2 rounded-lg transition-colors">
                  Save
                </button>
              </div>
            </div>
            <hr className="border-white/10 my-4" />
            <div>
              <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold px-4 py-2 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
