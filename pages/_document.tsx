import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='theme-color' content='#ffccdc' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}