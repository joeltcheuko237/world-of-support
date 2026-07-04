import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World of Support",
  description: "Plateforme de mise en relation professionnels et clients",
};

// Next.js injecte automatiquement les paramètres d'URL (comme [lng]) dans le layout
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  // On récupère dynamiquement la langue actuelle (fr ou en)
  const { lng } = await params;

  return (
    <html
      lang={lng}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Placer ClerkProvider ici résout l'erreur d'hydratation 
        car il n'interfère plus avec les attributs de la balise <html>
      */}
      <ClerkProvider>
        <body className="min-h-full flex flex-col bg-gray-950 text-white selection:bg-green-500 selection:text-black">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}