import './globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { fonts } from '../components/fonts'
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function Doggo({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(
    <>
      <style jsx global>
        {`
          :root {
            --font-raleway: ${fonts.raleway.style.fontFamily}, sans-serif;
            --font-roboto: ${fonts.roboto.style.fontFamily}, sans-serif;
            --font-roboto-mono: ${fonts.robotoMono.style.fontFamily}, sans-serif;
          }
        `}
      </style>
      <ChakraProvider disableGlobalStyle>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}