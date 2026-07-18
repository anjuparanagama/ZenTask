"use client";

import Image from "next/image";
import { ClipboardList } from "lucide-react";

export default function AuthIllustration() {
  return (
    <div className="relative w-full text-white">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
          <ClipboardList size={26} />
        </div>
        <h1 className="text-2xl font-bold">ZenTask</h1>
      </div>

      <h2 className="max-w-lg text-4xl font-bold leading-tight">
        Manage tasks.
        <br />
        Boost productivity.
      </h2>

      <p className="mt-4 max-w-md text-sm leading-6 text-cyan-100">
        Organize projects, track progress and collaborate with your team from
        one powerful workspace.
      </p>

      <div className="mt-10 flex justify-center">
        <div className="relative h-64 w-full max-w-md">
          <Image
            src="/images/task-management.png"
            alt="Task Management"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
