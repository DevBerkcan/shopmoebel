"use client";

import { useState } from "react";
import ShimmerButton from "@/components/ui/ShimmerButton";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-amber-700/20 border border-amber-700/30 text-amber-400 px-6 py-3 rounded-full text-sm">
          <span>✓</span>
          <span>Danke! Dein 10% Rabattcode kommt per E-Mail.</span>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Deine E-Mail-Adresse"
        className="flex-1 bg-stone-800/80 border border-stone-700 px-5 py-4 text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors text-sm"
      />
      <ShimmerButton
        type="submit"
        background="#b45309"
        shimmerColor="rgba(255,255,255,0.3)"
        className="whitespace-nowrap text-sm px-6 py-4"
      >
        10% sichern →
      </ShimmerButton>
    </form>
  );
}
