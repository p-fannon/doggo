import { extendTheme } from '@chakra-ui/react';
import '@fontsource/raleway';
import '@fontsource/roboto';
import '@fontsource/roboto-mono';

const theme = extendTheme({
    fonts: {
        heading: `'Raleway', sans-serif`,
        body: `'Roboto', sans-serif`,
        mono: `'Roboto Mono', sans-serif`
    },
})