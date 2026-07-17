"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onRegister: () => void;
}

export default function LoginForm({ onRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

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

      <form className="space-y-5">
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
              placeholder="you@example.com"
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
              placeholder="Enter your password"
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

          <Link
            href="#"
            className="
              font-medium
              text-teal-600
              hover:underline
            "
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}

        <button
          type="submit"
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
          "
        >
          Sign In
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
        Don't have an account?
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
