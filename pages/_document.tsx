import { Html, Head, Main, NextScript } from 'next/document'
import { fonts } from "../components/fonts"
 
export default function Document() {
  return (
    <Html lang="en" className={`${fonts.raleway.variable} ${fonts.roboto.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}