"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  shimmerColor?: string;
  background?: string;
  borderRadius?: string;
  className?: string;
};

export default function ShimmerButton({
  children,
  shimmerColor = "rgba(255,255,255,0.3)",
  background = "#1c1917",
  borderRadius = "0px",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 text-white text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ background, borderRadius }}
    >
      {/* Shimmer overlay */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(120deg, transparent 0%, transparent 40%, ${shimmerColor} 50%, transparent 60%, transparent 100%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 2.5s linear infinite",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
