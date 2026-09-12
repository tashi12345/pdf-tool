import Link from "next/link";

export const metadata = { title: "Privacy Policy — Free PDF Tools" };

export default function Privacy() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-16 text-sm leading-relaxed text-white/80">
      <h1 className="text-2xl font-bold mb-6 text-white">Privacy Policy</h1>

      <p className="mb-4">
        This site (&quot;Free PDF Tools&quot;) lets you merge, split, and convert files to
        PDF directly in your browser.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">Your files</h2>
      <p className="mb-4">
        All file processing happens locally in your browser using JavaScript. Your
        PDF and image files are never uploaded to our servers, never stored, and
        never seen by us.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">Advertising & cookies</h2>
      <p className="mb-4">
        This site may show ads served by third-party advertising networks (such as
        Google AdSense). These networks may use cookies or similar technologies to
        serve ads based on your prior visits to this or other websites. You can opt
        out of personalized advertising by visiting your ad settings with the relevant
        provider (for Google, at{" "}
        <a
          href="https://adssettings.google.com"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          adssettings.google.com
        </a>
        ).
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">Analytics</h2>
      <p className="mb-4">
        We may use basic, privacy-respecting analytics to understand overall traffic
        (e.g. number of visits), without identifying individual users.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2 text-white">Contact</h2>
      <p className="mb-4">
        Questions about this policy can be sent to{" "}
        <a className="underline" href="mailto:gieeksoftwaresolutions@gmail.com">
          gieeksoftwaresolutions@gmail.com
        </a>
        .
      </p>

      <Link href="/" className="underline text-white/60 hover:text-white">
        ← Back home
      </Link>
    </main>
  );
}
