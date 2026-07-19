"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { register } from "@/services/auth.service";
import { login } from "@/services/auth.service";
import { TOKEN_KEY } from "@/lib/api";

interface RegisterFormProps {
  onLogin: () => void;
}

export default function RegisterForm({ onLogin }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      const { token } = await login(email, password);

      localStorage.setItem(TOKEN_KEY, token);
      router.push("/Dashboard");
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Registration failed";

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
          dark:text-slate-100
        "
        >
          Create Account
        </h2>

        <p
          className="
          mt-2
          text-sm
          text-slate-500
          dark:text-slate-400
        "
        >
          Join TaskFlow and manage your work smarter
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}

        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
          >
            Full Name
          </label>

          <div
            className="
            flex
            items-center
            rounded-xl
            border
            border-slate-200
            dark:border-gray-700
            px-4
            transition
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/20
          "
          >
            <User size={18} className="text-slate-400 dark:text-slate-500" />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="
                w-full
                bg-transparent
                px-3
                py-3
                text-sm
                text-slate-800
                dark:text-slate-200
                outline-none
              "
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
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
            dark:border-gray-700
            px-4
            transition
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/20
          "
          >
            <Mail size={18} className="text-slate-400 dark:text-slate-500" />

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
                text-slate-800
                dark:text-slate-200
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
            dark:text-slate-300
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
            dark:border-gray-700
            px-4
          "
          >
            <Lock size={18} className="text-slate-400 dark:text-slate-500" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
              className="
                w-full
                bg-transparent
                px-3
                py-3
                text-sm
                text-slate-800
                dark:text-slate-200
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 dark:text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
          >
            Confirm Password
          </label>

          <div
            className="
            flex
            items-center
            rounded-xl
            border
            border-slate-200
            dark:border-gray-700
            px-4
          "
          >
            <Lock size={18} className="text-slate-400 dark:text-slate-500" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="
                w-full
                bg-transparent
                px-3
                py-3
                text-sm
                text-slate-800
                dark:text-slate-200
                outline-none
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 dark:text-slate-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-3
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
          {loading ? "Creating Account..." : "Create Account"}
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Login Switch */}

      <div
        className="
        mt-8
        text-center
        text-sm
        text-slate-500
        dark:text-slate-400
      "
      >
        Already have an account?
        <button
          onClick={onLogin}
          className="
            ml-2
            font-semibold
            text-teal-600
            dark:text-teal-400
            hover:underline
          "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
