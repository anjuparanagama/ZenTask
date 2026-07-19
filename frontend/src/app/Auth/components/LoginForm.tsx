"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { login } from "@/services/auth.service";
import { TOKEN_KEY } from "@/lib/api";

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({ onRegister }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await login(email, password);

      localStorage.setItem(TOKEN_KEY, token);
      router.push("/Dashboard");
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Login failed";

      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-8">
        <h2
          className="
          text-3xl
          font-bold
          text-slate-800
        "
        >
          Welcome Back
        </h2>

        <p
          className="
          mt-2
          text-sm
          text-slate-500
        "
        >
          Login to access your dashboard
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Email */}

        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
          >
            Email Address
          </label>

          <div
            className="
            flex
            items-center
            rounded-xl
            border
            border-slate-200
            px-4
            transition
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/20
          "
          >
            <Mail size={18} className="text-slate-400" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="
                w-full
                bg-transparent
                px-3
                py-3
                text-sm
                outline-none
              "
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
          >
            Password
          </label>

          <div
            className="
            flex
            items-center
            rounded-xl
            border
            border-slate-200
            px-4
            transition
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/20
          "
          >
            <Lock size={18} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="
                w-full
                bg-transparent
                px-3
                py-3
                text-sm
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                text-slate-400
                hover:text-slate-700
              "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Options */}

        <div
          className="
          flex
          items-center
          justify-between
          text-sm
        "
        >
          <label
            className="
            flex
            items-center
            gap-2
            text-slate-600
          "
          >
            <input type="checkbox" className="rounded" />
            Remember me
          </label>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-teal-600
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-teal-700
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Signing In..." : "Sign In"}
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Register */}

      <div
        className="
        mt-8
        text-center
        text-sm
        text-slate-500
      "
      >
        Don&apos;t have an account?
        <button
          onClick={onRegister}
          className="
            ml-2
            font-semibold
            text-teal-600
            hover:underline
          "
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
