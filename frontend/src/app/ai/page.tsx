"use client";
import { useState } from "react";

export default function AiPractice() {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      // Mocking User ID
      const reqBody = {
        userId: "00000000-0000-0000-0000-000000000000",
        text: text,
        practiceType: "grammar"
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050'}`}/v1/ai/practice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      });
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error(err);
      alert("Error reaching AI service");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-white/10 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent mb-4">
          AI Language Coach
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Write an English sentence or paragraph below. Our AI tutor will analyze your grammar, vocabulary, and sentence structure instantly and provide feedback!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-xl font-bold text-neutral-200">Your Text</label>
          <textarea 
            rows={8}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-lg"
            placeholder="e.g. I go to school yesterday and I see my friend there..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold rounded-xl text-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            {loading ? "Analyzing..." : "Get AI Feedback ✨"}
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-xl font-bold text-neutral-200">AI Feedback</label>
          
          {!feedback && !loading && (
             <div className="h-64 flex items-center justify-center bg-white/5 border border-white/5 border-dashed rounded-2xl text-neutral-500">
               Waiting for your text...
             </div>
          )}

          {loading && (
            <div className="h-64 flex flex-col gap-4 items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-emerald-400 animate-pulse">
               <div className="text-4xl">🤖</div>
               AI is thinking...
            </div>
          )}

          {feedback && !loading && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Score</span>
                <div className="text-4xl font-black text-emerald-400">{feedback.score}/100</div>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Message</span>
                <p className="text-lg text-white">{feedback.message}</p>
              </div>
              <div className="p-4 bg-black/40 rounded-xl space-y-2">
                <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Corrected Version</span>
                <p className="text-emerald-300">{feedback.correctedText}</p>
              </div>
              {feedback.grammarIssues && feedback.grammarIssues.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2">
                  <span className="text-xs uppercase font-bold text-red-500 tracking-wider">Issues Found</span>
                  <ul className="list-disc list-inside text-red-300">
                    {feedback.grammarIssues.map((issue: string, idx: number) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
