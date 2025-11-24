
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SolarVault — Portable Solar Power in a Box | Clean Energy Made Simple",
  description: "A compact, plug-and-play solar setup that brings clean power anywhere. From 100W to 1000W — SolarVault makes solar energy simple, affordable, and portable for every Filipino household.",
  keywords: ["solar power", "portable solar", "solar energy", "renewable energy", "solar panels", "solar box", "clean energy", "Philippines solar"],
  authors: [{ name: "SolarVault" }],
  openGraph: {
    title: "SolarVault — Portable Solar Power in a Box",
    description: "A compact, plug-and-play solar setup that brings clean power anywhere. From 100W to 1000W — SolarVault makes solar energy simple, affordable, and portable.",
    url: "https://solarvault.com",
    siteName: "SolarVault",
    images: [
      {
        url: "/images/solar-box-b1.png",
        width: 1200,
        height: 630,
        alt: "SolarVault - Portable Solar Power Box",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolarVault — Portable Solar Power in a Box",
    description: "A compact, plug-and-play solar setup that brings clean power anywhere. From 100W to 1000W — SolarVault makes solar energy simple, affordable, and portable.",
    images: ["/images/solar-box-b1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
