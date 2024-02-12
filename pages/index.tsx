import type { ReactElement } from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
    return <p className={`my-3 text-2xl font-semibold`}>Hello, world!</p>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default HomePage