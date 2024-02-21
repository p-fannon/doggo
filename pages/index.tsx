import type { ReactElement } from 'react'
import Layout from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import FetchComponent from '@/components/FetchComponent'
import DoggoHead from '@/components/DoggoHead'

const HomePage: NextPageWithLayout = () => {
    return <FetchComponent />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <DoggoHead title='Doggo App' />
            <Layout>
                {page}
            </Layout>
        </>
    )
}

export default HomePage