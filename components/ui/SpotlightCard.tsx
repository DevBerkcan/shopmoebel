"use client";

import { useRef, MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(180, 83, 9, 0.12)",
}: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const div = divRef.current;
    if (!div) return;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    div.style.setProperty("--spotlight-x", `${x}px`);
    div.style.setProperty("--spotlight-y", `${y}px`);
    div.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    const div = divRef.current;
    if (div) div.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
          "--spotlight-opacity": "0",
          "--spotlight-color": spotlightColor,
        } as React.CSSProperties
      }
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 70%)`,
          opacity: "var(--spotlight-opacity)" as any,
        }}
      />
      {children}
    </div>
  );
}
