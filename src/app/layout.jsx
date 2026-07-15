import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import PreloaderWrapper from "@/components/PreloaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Idea Behind",
  description:
    "Idea Behind is a design-forward web studio crafting premium websites and digital experiences for modern brands. We blend strategy, design, and development to create fast, interactive, and visually refined websites that leave a lasting impression.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <LenisProvider>
          <PreloaderWrapper>
            <Navbar />
            {children}
          </PreloaderWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
