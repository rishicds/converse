import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CookieBanner from "@/components/shared/CookieBanner";

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
        <head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, \"clarity\", \"script\", \"twm7ybez2g\");
              `,
            }}
          />
        </head>
        <body
          className={`${raleway.variable} ${openSans.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
        </body>
      </html>
  );
}
