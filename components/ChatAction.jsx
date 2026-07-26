"use client";

import { useState } from "react";
import { Copy, Check, Pencil } from "lucide-react";

// --- Copy Button Component ---
export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
      title="Copy message"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );
}

// --- Edit Button Component ---
export function EditButton({ onEditInit }) {
  return (
    <button
      onClick={onEditInit}
      className="p-1 text-slate-400 hover:text-slate-200 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      title="Edit message"
    >
      <Pencil size={14} />
    </button>
  );
}