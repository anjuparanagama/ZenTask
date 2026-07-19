"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { login } from "@/services/auth.service";
import { TOKEN_KEY } from "@/lib/api";
import { toast } from "sonner";

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({ onRegister }: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await login(email, password);
      localStorage.setItem(TOKEN_KEY, token);
      toast.success("Login successful!");
      router.push("/Dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Login to access your dashboard
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-gray-700 px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20">
            <Mail size={18} className="text-slate-400 dark:text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 dark:text-slate-200 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-gray-700 px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20">
            <Lock size={18} className="text-slate-400 dark:text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 dark:text-slate-200 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Register link */}
      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?
        <button
          onClick={onRegister}
          className="ml-2 font-semibold text-teal-600 dark:text-teal-400 hover:underline"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
