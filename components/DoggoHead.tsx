import React from 'react'
import Head from 'next/head'

export type DoggoHeaderType = {
    title: string
}

export default function DoggoHeader({title}: DoggoHeaderType) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='theme-color' content='#ffccdc' />
        </Head>
    )
}