import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sai Han Htet",
  description: "Portfolio of Sai Han Htet - Software Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="theme-light">
      <head>
        <link rel="icon" type="image/png" href="/assets/icon.png" />
        <script
          src="https://kit.fontawesome.com/516be7d25c.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
