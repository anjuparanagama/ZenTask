"use client";

import { ClipboardList } from "lucide-react";
import Lottie from "lottie-react";
import logoAnimation from "@/animations/logotwo.json";

export default function AuthIllustration() {
  return (
    <div className="relative w-full text-white">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
          <ClipboardList size={26} />
        </div>
        <h1 className="text-2xl font-bold">ZenTask</h1>
      </div>

      <p className=" max-w-md text-sm leading-6 text-cyan-100">
        Organize projects, track progress and collaborate with your team from
        one powerful workspace.
      </p>

      <div className=" flex justify-center">
        <div className="relative w-full max-w-md">
          <Lottie animationData={logoAnimation} loop autoplay />
        </div>
      </div>
    </div>
  );
}
