import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Crafters",
  description: "A website for cuet students to give mock tests.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
