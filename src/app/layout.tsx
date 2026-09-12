import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free PDF Tools — Merge, Split & Convert Images to PDF",
  description:
    "Merge PDFs, split PDF pages, and convert images to PDF — all free, all done in your browser. Files never leave your device.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6888500425928718"
          crossOrigin="anonymous"
        />
        <Script
          id="propellerads-inpage-push"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(s){s.dataset.zone='11782131',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))",
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
