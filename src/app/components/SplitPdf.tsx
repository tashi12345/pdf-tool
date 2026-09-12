"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob } from "./MergePdf";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSelect(f: File | null) {
    setError(null);
    setFile(f);
    setPageCount(null);
    if (!f) return;
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setPageCount(doc.getPageCount());
    } catch {
      setError("Couldn't read that PDF.");
    }
  }

  function parseRange(input: string, max: number): number[] {
    const pages = new Set<number>();
    for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
      const m = part.match(/^(\d+)(?:-(\d+))?$/);
      if (!m) continue;
      const start = parseInt(m[1], 10);
      const end = m[2] ? parseInt(m[2], 10) : start;
      for (let p = start; p <= end; p++) {
        if (p >= 1 && p <= max) pages.add(p - 1);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  }

  async function split() {
    if (!file || !pageCount) return;
    const indices = parseRange(range, pageCount);
    if (indices.length === 0) {
      setError('Enter a valid page range, e.g. "1-3,5"');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, indices);
      pages.forEach((p) => out.addPage(p));
      const outBytes = await out.save();
      downloadBlob(new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }), "split.pdf");
    } catch {
      setError("Something went wrong splitting that PDF.");
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
          className="hidden"
          onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
        />
        <p className="text-white/70">
          {file ? file.name : "Click to choose a PDF"}
        </p>
        {pageCount !== null && (
          <p className="text-white/40 text-xs mt-1">{pageCount} pages</p>
        )}
      </label>

      {pageCount !== null && (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/60">
            Pages to extract (e.g. 1-3,5)
          </label>
          <input
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder={`1-${pageCount}`}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
          />
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={split}
        disabled={busy || !file || !range}
        className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 font-medium"
      >
        {busy ? "Splitting…" : "Extract Pages & Download"}
      </button>
    </div>
  );
}
