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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng?: string }>; // 🛠️ 'lng' est maintenant optionnel pour satisfaire le validateur Next.js
}>) {
  // On récupère la langue actuelle avec une valeur par défaut en cas d'absence à la racine
  const { lng } = await params;
  const currentLng = lng || "fr"; 

  return (
    <html
      lang={currentLng}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ClerkProvider>
        <body className="min-h-full flex flex-col bg-gray-950 text-white selection:bg-green-500 selection:text-black">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}