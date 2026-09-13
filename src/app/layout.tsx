import type { Metadata } from "next";
import Script from "next/script";
import Beacon from "./components/Beacon";
import "./globals.css";

const siteUrl = "https://pdf-tool-three-beta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free PDF Tools — Merge, Split & Convert Images to PDF",
  description:
    "Merge PDF online, split PDF pages, and convert JPG/PNG to PDF for free — done entirely in your browser. No sign-up, files never uploaded.",
  keywords: [
    "merge pdf online free",
    "split pdf online",
    "jpg to pdf",
    "png to pdf",
    "image to pdf converter",
    "free pdf tools",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Free PDF Tools — Merge, Split & Convert Images to PDF",
    description:
      "Merge PDF online, split PDF pages, and convert JPG/PNG to PDF for free — done entirely in your browser.",
    url: siteUrl,
    siteName: "Free PDF Tools",
    type: "website",
  },
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
        <Beacon />
        {children}
      </body>
    </html>
  );
}
