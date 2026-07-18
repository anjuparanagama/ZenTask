"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface RegisterFormProps {
  onLogin: () => void;
}

export default function RegisterForm({ onLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          Create Account
        </h2>

        <p
          className="
          mt-2
          text-sm
          text-slate-500
        "
        >
          Join TaskFlow and manage your work smarter
        </p>
      </div>

      <form className="space-y-4">
        {/* Name */}

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
            Full Name
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
            <User size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="John Doe"
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
          "
          >
            <Lock size={18} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
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
              className="text-slate-400"
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
            px-4
          "
          >
            <Lock size={18} className="text-slate-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
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
          "
        >
          Create Account
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
      "
      >
        Already have an account?
        <button
          onClick={onLogin}
          className="
            ml-2
            font-semibold
            text-teal-600
            hover:underline
          "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
