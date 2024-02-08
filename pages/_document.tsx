import { Html, Head, Main, NextScript } from 'next/document'
import "./globals.css";
import type { Metadata } from 'next'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doggo",
  description: "Application for viewing doggos",
};
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body className={inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}