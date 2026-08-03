import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ppNeueMontreal = localFont({
  src: [
    { path: "../fonts/ppneuemontreal-book.otf", weight: "400", style: "normal" },
    { path: "../fonts/ppneuemontreal-italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/ppneuemontreal-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/ppneuemontreal-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
});

const gtSuperDisplay = localFont({
  src: [
    { path: "../fonts/GT-Super-Display-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/GT-Super-Display-Light-Italic.otf", weight: "300", style: "italic" },
    { path: "../fonts/GT-Super-Display-Regular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-gt-super-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phia Marketplace",
  description: "Curated fashion from the world's best brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ppNeueMontreal.variable} ${gtSuperDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
