"use client";

import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "terra-holz-wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isInWishlist = useCallback(
    (id: number) => wishlist.includes(id),
    [wishlist]
  );

  return { wishlist, hydrated, toggleWishlist, isInWishlist };
}
