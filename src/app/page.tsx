import Link from "next/link";
import PdfTools from "./components/PdfTools";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-16 gap-16">
      <header className="text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Free PDF Tools</h1>
        <p className="text-white/60">
          Merge, split, and convert images to PDF — free, no sign-up. Your files are
          processed entirely in your browser and never uploaded anywhere.
        </p>
      </header>

      <PdfTools />

      <section className="max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4 text-sm text-white/70">
          <FaqItem
            q="Are my files uploaded to a server?"
            a="No. Every tool on this page runs entirely in your browser using JavaScript — your PDF and image files never leave your device."
          />
          <FaqItem
            q="Is there a file size or page limit?"
            a="No hard limit is enforced, but very large files may be slower since everything runs on your device's own processing power rather than a server."
          />
          <FaqItem
            q="What file types are supported?"
            a="Merge and Split work with standard PDF files. Images to PDF accepts JPG and PNG images."
          />
          <FaqItem
            q="Is this really free?"
            a="Yes, with no sign-up or account required. The site is supported by ads."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <p className="font-medium text-white/90 mb-1">{q}</p>
      <p>{a}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-xs text-white/40 flex gap-4">
      <Link href="/privacy" className="hover:text-white/70">
        Privacy Policy
      </Link>
      <Link href="/terms" className="hover:text-white/70">
        Terms
      </Link>
    </footer>
  );
}
