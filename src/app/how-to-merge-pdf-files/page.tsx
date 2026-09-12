import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Merge PDF Files Online (Free, No Sign-Up)",
  description:
    "Step-by-step guide to merging multiple PDF files into one, for free, directly in your browser — no software or account needed.",
};

export default function HowToMergePdf() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-sm leading-relaxed text-white/80">
      <h1 className="text-2xl font-bold mb-6 text-white">
        How to Merge PDF Files Online
      </h1>

      <p className="mb-4">
        Merging PDFs combines multiple separate PDF documents into a single
        file, in the order you choose. Here&apos;s how to do it for free,
        without installing anything:
      </p>

      <ol className="list-decimal pl-5 mb-6 flex flex-col gap-2">
        <li>
          Go to the{" "}
          <Link href="/" className="underline text-blue-400 hover:text-blue-300">
            Free PDF Tools
          </Link>{" "}
          homepage and select the <strong>Merge PDF</strong> tab.
        </li>
        <li>Click the upload area and choose two or more PDF files.</li>
        <li>
          Use the ↑ / ↓ buttons next to each file to put them in the order
          you want the final document to read.
        </li>
        <li>
          Click <strong>Merge PDFs &amp; Download</strong> — the combined
          file downloads straight to your device.
        </li>
      </ol>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">
        Is it safe to merge sensitive PDFs this way?
      </h2>
      <p className="mb-4">
        Yes — this tool processes everything locally in your browser using
        JavaScript. Your files are never uploaded to a server, so nothing
        leaves your device.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">
        Can I also split or convert files?
      </h2>
      <p className="mb-4">
        Yes — the same page has tabs for <strong>Split PDF</strong> (extract
        specific pages) and <strong>Images to PDF</strong> (turn JPG/PNG
        files into a PDF).
      </p>

      <p className="mb-8">
        Ready to try it?{" "}
        <Link href="/" className="underline text-blue-400 hover:text-blue-300">
          Merge your PDFs now
        </Link>
        .
      </p>

      <Link href="/" className="underline text-white/60 hover:text-white">
        ← Back home
      </Link>
    </main>
  );
}
