import type { Metadata } from "next";
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
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
