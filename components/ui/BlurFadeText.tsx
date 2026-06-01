"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  byWord?: boolean;
};

export default function BlurFadeText({
  text,
  as: Tag = "p",
  className = "",
  delay = 0,
  duration = 0.8,
  byWord = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!byWord) {
    return (
      <Tag
        ref={ref as any}
        className={`${className}`}
        style={{
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0)" : "blur(12px)",
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: `opacity ${duration}s ease, filter ${duration}s ease, transform ${duration}s ease`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag ref={ref as any} className={`${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em]"
          style={{
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0)" : "blur(8px)",
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease`,
            transitionDelay: `${delay + i * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
