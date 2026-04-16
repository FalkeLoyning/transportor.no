import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Transportør.no | Konfigurer og bestill transportører",
  description:
    "Interaktiv RFQ-veiviser for båndtransportører og skruetransportører. Velg parametere, se 3D-forhåndsvisning og send forespørsel direkte til ingeniør.",
  keywords: ["transportør", "båndtransportør", "skruetransportør", "conveyor", "RFQ", "forespørsel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${body.variable} h-full antialiased`}>
      <body className="h-full bg-background text-foreground font-body flex flex-col">
        {children}
      </body>
    </html>
  );
}
