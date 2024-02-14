import type { ReactElement } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import FetchButton from '@/components/FetchButton'

const HomePage: NextPageWithLayout = () => {
    return <div className="flex flex-col mt-6 justify-center items-center"><FetchButton /></div>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default HomePage