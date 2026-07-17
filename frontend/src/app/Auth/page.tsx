"use client";

import { useState } from "react";
import AuthIllustration from "./components/AuthIllustration";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/registrationForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
      <div
        className="
          relative
          w-full
          max-w-7xl
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div className="grid min-h-[720px] lg:grid-cols-2">
          {/* LEFT PANEL */}

          <div
            className={`
              hidden
              lg:flex
              items-center
              justify-center
              bg-gradient-to-br
              from-teal-600
              via-cyan-600
              to-sky-700
              p-10

              transition-all
              duration-500
              ease-in-out

              ${
                isLogin
                  ? "order-first opacity-100 translate-x-0"
                  : "order-last opacity-100 translate-x-0"
              }
            `}
          >
            <AuthIllustration />
          </div>

          {/* RIGHT PANEL */}

          <div
            className="
              flex
              items-center
              justify-center
              p-8
              transition-all
              duration-500
              ease-in-out
            "
          >
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginForm onRegister={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onLogin={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
