"use client";

import { useState } from "react";
import MergePdf from "./MergePdf";
import SplitPdf from "./SplitPdf";
import ImagesToPdf from "./ImagesToPdf";

const TABS = [
  { id: "merge", label: "Merge PDF" },
  { id: "split", label: "Split PDF" },
  { id: "images", label: "Images to PDF" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PdfTools() {
  const [tab, setTab] = useState<TabId>("merge");

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex rounded-xl bg-white/5 p-1 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              tab === t.id ? "bg-blue-600 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        {tab === "merge" && <MergePdf />}
        {tab === "split" && <SplitPdf />}
        {tab === "images" && <ImagesToPdf />}
      </div>
    </div>
  );
}
