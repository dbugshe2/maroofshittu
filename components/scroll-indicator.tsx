"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

export function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const scrollableDistance = documentHeight - windowHeight;
      if (scrollableDistance > 0) {
        setProgress((scrollTop / scrollableDistance) * 100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculate
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleValueChange = (value: number | readonly number[]) => {
    const newProgress = Array.isArray(value) ? value[0] : (value as number);
    setProgress(newProgress); // optimistic update

    // Calculate new scroll position
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableDistance = documentHeight - windowHeight;

    window.scrollTo({
      top: (newProgress / 100) * scrollableDistance,
      behavior: "auto",
    });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 text-xs font-medium tracking-widest hidden lg:flex lg:flex-col lg:gap-2 z-50">
      <Slider
        orientation="vertical"
        className="cursor-pointer h-32 rotate-180"
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={handleValueChange}
      />
      <span className="flex items-center -rotate-90 gap-2 mt-4">Scroll</span>
    </div>
  );
}
