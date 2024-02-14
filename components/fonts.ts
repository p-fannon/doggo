import { Raleway, Roboto, Roboto_Mono } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
    display: 'swap'
})

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: '400',
    display: 'swap'
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap'
})

export const fonts = {
    raleway, roboto, robotoMono
}