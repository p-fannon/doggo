import type { ReactElement } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import FetchComponent from '@/components/FetchComponent'

const HomePage: NextPageWithLayout = () => {
    return <FetchComponent />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default HomePage