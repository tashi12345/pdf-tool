import Link from "next/link";

export const metadata = { title: "Terms of Use — Free PDF Tools" };

export default function Terms() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-sm leading-relaxed text-white/80">
      <h1 className="text-2xl font-bold mb-6 text-white">Terms of Use</h1>

      <p className="mb-4">
        This site is provided free of charge, as-is, for personal and professional
        use. By using it, you agree to the following:
      </p>

      <ul className="list-disc pl-5 mb-4 flex flex-col gap-2">
        <li>
          Files are processed entirely in your browser; we do not receive or store
          them, and are not responsible for lost or corrupted output files.
        </li>
        <li>
          You may not use this site for any unlawful purpose or in a way that harms
          the service or other users.
        </li>
        <li>
          We may display advertisements from third-party networks to keep this tool
          free.
        </li>
        <li>
          We reserve the right to change or discontinue the service at any time.
        </li>
      </ul>

      <p className="mb-4">
        Contact:{" "}
        <a className="underline" href="mailto:gieeksoftwaresolutions@gmail.com">
          gieeksoftwaresolutions@gmail.com
        </a>
      </p>

      <Link href="/" className="underline text-white/60 hover:text-white">
        ← Back home
      </Link>
    </main>
  );
}
