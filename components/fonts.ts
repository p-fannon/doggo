import { Raleway, Roboto } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    variable: '--font-raleway',
})

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: '400',
})

export const fonts = {
    raleway, roboto
}