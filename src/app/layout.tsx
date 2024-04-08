import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Theme, ThemePanel } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Crafters",
  description: "A website for cuet students to give CUET mock tests.",
  keywords: "CUET, Mock Tests, Online Tests",
  authors: [{ name: "Shreyas Ramachandran" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
