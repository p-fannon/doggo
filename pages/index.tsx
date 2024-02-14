import type { ReactElement } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { Text } from '@chakra-ui/react'

const HomePage: NextPageWithLayout = () => {
    return <Text className="my-3 text-base font-serif">Hello, world!</Text>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default HomePage