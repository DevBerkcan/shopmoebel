"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagneticButton({ children, className = "", strength = 0.4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setPos({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-pointer ${className}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: isHovered ? "transform 0.15s ease" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {children}
    </div>
  );
}
