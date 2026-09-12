"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setError(null);
    setFiles((prev) => [...prev, ...Array.from(list)]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFile(index: number, dir: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) {
      setError("Add at least two PDF files to merge.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const outBytes = await merged.save();
      downloadBlob(new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }), "merged.pdf");
    } catch {
      setError("Couldn't merge those files — make sure they're all valid PDFs.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="rounded-xl border-2 border-dashed border-white/20 p-8 text-center cursor-pointer hover:border-white/40 transition">
        <input
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <p className="text-white/70">Click to add PDF files</p>
        <p className="text-white/40 text-xs mt-1">Add two or more — order below is the merge order</p>
      </label>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
            >
              <span className="truncate">{i + 1}. {f.name}</span>
              <span className="flex gap-2 shrink-0">
                <button onClick={() => moveFile(i, -1)} className="text-white/50 hover:text-white">↑</button>
                <button onClick={() => moveFile(i, 1)} className="text-white/50 hover:text-white">↓</button>
                <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300">✕</button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={merge}
        disabled={busy || files.length < 2}
        className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 font-medium"
      >
        {busy ? "Merging…" : "Merge PDFs & Download"}
      </button>
    </div>
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
