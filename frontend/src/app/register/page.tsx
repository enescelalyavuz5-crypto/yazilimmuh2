"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    englishLevel: "beginner"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Registration successful!");
        router.push("/profile"); // mock redirect for now
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">First Name</label>
            <input type="text" required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Last Name</label>
            <input type="text" required
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
          <input type="email" required
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
          <input type="password" required
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Current English Level</label>
          <select 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => setFormData({...formData, englishLevel: e.target.value})}>
            <option value="beginner">Beginner</option>
            <option value="elementary">Elementary</option>
            <option value="intermediate">Intermediate</option>
            <option value="upper-intermediate">Upper Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" 
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg px-4 py-3 mt-6 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          Join FluentBee
        </button>
      </form>
    </div>
  );
}
