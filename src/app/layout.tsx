import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drizzle Demo — INDDDID",
  description: "CRUD users/posts avec Drizzle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
