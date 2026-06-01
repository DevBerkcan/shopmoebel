"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
};

const stats: Stat[] = [
  { value: 37, suffix: "+", label: "Jahre Erfahrung" },
  { prefix: "", value: 12, suffix: ".000+", label: "Zufriedene Kunden" },
  { value: 100, suffix: "%", label: "FSC-zertifiziert" },
  { value: 5, suffix: " Jahre", label: "Garantie" },
];

function Counter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

type Props = { className?: string };

export default function AnimatedCounters({ className = "" }: Props) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((s, i) => (
        <div key={i} className="text-center group">
          <div className="font-serif text-5xl md:text-6xl text-amber-700 mb-2 tabular-nums">
            <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
          </div>
          <p className="text-stone-500 text-sm tracking-wide">{s.label}</p>
          <div className="w-8 h-0.5 bg-amber-700/30 mx-auto mt-3 group-hover:w-16 transition-all duration-500" />
        </div>
      ))}
    </div>
  );
}
