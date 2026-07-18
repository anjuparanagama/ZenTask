"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import Lottie from "lottie-react";
import completedAnimation from "@/animations/Completed.json";

const SPLASH_DURATION = 1500;
const FADE_DURATION = 200;

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), SPLASH_DURATION);
    const endTimer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease-out`,
      }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <ClipboardList size={30} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">ZenTask</h1>
      </div>

      <div className="flex h-48 w-48 items-center justify-center">
        <Lottie
          animationData={completedAnimation}
          loop={false}
          autoplay
          className="h-full w-full"
        />
      </div>

      <div className="mt-8 h-1.5 w-40 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white"
          style={{
            animation: `splashProgress ${SPLASH_DURATION}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes splashProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
