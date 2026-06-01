"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { id: number; name: string };

export default function DeleteProductButton({ id, name }: Props) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Fehler beim Löschen");
      }
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  if (confirm) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs px-2 py-1.5 bg-red-700 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50"
        >
          {loading ? "..." : "Ja"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-xs px-2 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg transition"
        >
          Nein
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="text-xs px-3 py-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded-lg transition"
      title={`"${name}" löschen`}
    >
      Löschen
    </button>
  );
}
