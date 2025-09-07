import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Converse - Strategic Business Consulting and Advanced Research Solutions",
  description: "We are a team of highly experienced marketers, strategic thinkers and research analysts creating value through insightful analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${openSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
