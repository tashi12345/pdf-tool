"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob } from "./MergePdf";

export default function ImagesToPdf() {
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

  async function convert() {
    if (files.length === 0) {
      setError("Add at least one image.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const doc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const isPng = file.type === "image/png";
        const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const outBytes = await doc.save();
      downloadBlob(new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }), "images.pdf");
    } catch {
      setError("Couldn't convert those images — use JPG or PNG files.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="rounded-xl border-2 border-dashed border-white/20 p-8 text-center cursor-pointer hover:border-white/40 transition">
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <p className="text-white/70">Click to add JPG or PNG images</p>
        <p className="text-white/40 text-xs mt-1">One page per image, in the order added</p>
      </label>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
            >
              <span className="truncate">{i + 1}. {f.name}</span>
              <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300 shrink-0">✕</button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={convert}
        disabled={busy || files.length === 0}
        className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 font-medium"
      >
        {busy ? "Converting…" : "Convert to PDF & Download"}
      </button>
    </div>
  );
}
