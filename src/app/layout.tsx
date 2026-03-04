import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Werner Catering | Catering Restaurant Hotel",
  description:
    "Werner Catering GmbH & Co. KG – Ihr kompetenter Partner für gehobenes Catering, Restaurant und Hotel in Dautphetal-Mornshausen. Über 200 Jahre Gastro-Tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
