"use client";

import { useState } from "react";
import Auth from "./Auth/page";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <Auth />;
}
