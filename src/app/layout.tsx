import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

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
  // Child segments set just their page name; this appends the suffix.
  title: { default: "Phia", template: "%s | Phia" },
  description: "Brand intelligence dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ppNeueMontreal.variable} ${gtSuperDisplay.variable} ${inter.variable} ${robotoMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
