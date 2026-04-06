"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [stats, setStats] = useState({ memorizedWordsCount: 0, completedLessonsCount: 0 });
  const [goal, setGoal] = useState(30);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("A1");
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Kullanıcı");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName") || "Kullanıcı";
    setUserId(id);
    setUserName(name);
    if (!id) return;

    // Kullanıcı Detayları (Profil)
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.firstName) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setGoal(data.dailyGoalMinutes);
          setLevel(data.englishLevel.toUpperCase());
          setUserName(`${data.firstName} ${data.lastName}`);
          localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);
        }
      })
      .catch(console.error);

    // İstatistikler
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${id}/statistics`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.memorizedWordsCount !== "undefined") setStats(data);
      })
      .catch(console.error);

    // Favori kelimeler
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/words/favorites?userId=${id}`)
      .then(res => res.json())
      .then(data => { if (data?.data) setFavorites(data.data); })
      .catch(console.error);
  }, []);

  const removeFavorite = async (wordId: string) => {
    if (!userId) return;
    setRemovingId(wordId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/words/${wordId}/favorite?userId=${userId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setFavorites(prev => prev.filter(w => w.id !== wordId));
        toast.success("Favorilerden çıkarıldı.", { icon: "💔" });
      }
    } catch {
      toast.error("Bir hata oluştu.");
    } finally {
      setRemovingId(null);
    }
  };

  const saveSettings = async () => {
    if (!userId) return;
    setSavingSettings(true);
    try {
      // Profil (İsim Soyisim) Güncelle
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${userId}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName })
      });
      // Günlük Hedef Güncelle
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}/v1/users/${userId}/study-goal`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dailyGoalMinutes: goal })
      });
      
      setUserName(`${firstName} ${lastName}`);
      localStorage.setItem("userName", `${firstName} ${lastName}`);
      
      // Notify running timer in Navbar
      window.dispatchEvent(new Event("goal-updated"));
      
      toast.success("Profil ayarları kaydedildi!");
    } catch {
      toast.error("Ayarlar kaydedilemedi.");
    } finally {
      setSavingSettings(false);
    }
  };

  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-6 pb-8 border-b border-white/10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]">
          {initials || "?"}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{userName}</h1>
          <p className="text-neutral-400 font-medium">{level} Level learner</p>
        </div>
      </div>

      {/* Stats + Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sol Kolon - Stats */}
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

        {/* Sağ Kolon - Profile Settings */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-amber-400">⚙️</span> Profile Settings
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Daily Study Goal (Minutes)</label>
              <div className="flex gap-2">
                <input type="number" min="1" value={goal} onChange={e => setGoal(parseInt(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none text-white" />
                <button onClick={saveSettings} disabled={savingSettings}
                  className="bg-amber-500/20 hover:bg-amber-500 hover:text-black border border-amber-500/50 text-amber-400 font-bold px-6 py-2 rounded-lg transition-all disabled:opacity-50">
                  {savingSettings ? "..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favori Kelimeler */}
      <div className="space-y-4 border-t border-white/10 pt-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-amber-400">⭐</span> Favori Kelimelerim
          <span className="ml-2 text-sm font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full">
            {favorites.length} kelime
          </span>
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/5 border-dashed text-neutral-500">
            Henüz favori kelime eklemedin. <br />
            <span className="text-sm">Sözlük sayfasından kelimeleri favorile!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(w => (
              <div key={w.id}
                className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 backdrop-blur-md hover:bg-amber-500/10 transition-all group">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-amber-400">{w.english}</h3>
                  <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-neutral-400">{w.level}</span>
                </div>
                <p className="text-base text-white mb-1">{w.turkish}</p>
                <p className="text-xs text-neutral-500 italic border-t border-white/10 pt-2 mb-3">
                  {w.exampleSentence || "No example."}
                </p>
                <button
                  onClick={() => removeFavorite(w.id)}
                  disabled={removingId === w.id}
                  className="w-full py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-neutral-400 border border-white/5 hover:border-red-500/30 transition-all disabled:opacity-40">
                  {removingId === w.id ? "Kaldırılıyor..." : "★ Favorilerden Çıkar"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="pt-4 border-t border-red-500/20">
        <h2 className="text-lg font-bold flex items-center gap-2 text-red-400 mb-4">
          <span>⚠️</span> Danger Zone
        </h2>
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Delete Account</p>
            <p className="text-sm text-neutral-400">This action is permanent and cannot be undone.</p>
          </div>
          <button className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 font-bold px-6 py-2 rounded-lg transition-all duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
