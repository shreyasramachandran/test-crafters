import type { Metadata } from "next";
import { Theme, ThemePanel } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Blueprint",
  description: "A Next.js Template with Tailwind, ESLint, and Radix UI",
  keywords: "Next.js, Tailwind CSS, ESLint, Radix UI",
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
