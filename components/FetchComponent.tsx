import React, { useState } from 'react'
import FetchButton from './FetchButton'
import { Text } from '@chakra-ui/react'
import FetchImage from './FetchImage'
import axios, { AxiosResponse } from 'axios'

export type DoggoRandomImageResponse = {
    breed: string
    randomDogUrl: string
}

const config = {
    baseURL: `https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`,
    params: {
        bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
    },
    headers: {
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`
    }
}

export default function FetchComponent() {
    const [imageData, setImageData] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [breed, setBreed] = useState<string>('')

    const onClick = async () => {
        setIsLoading(true)
        setError('')
        try {
            await axios.get(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`, config)
            .then((apiResponse: AxiosResponse<any, any>) => {
                const { breed, randomDogUrl }: DoggoRandomImageResponse = apiResponse.data
                setImageData(randomDogUrl)
                setBreed(breed.split('-').join(' '))
            })
        } catch (e) {
            setError('Could not fetch a dog')
        } finally { setIsLoading(false) }
    }

    return (
        <div className="flex flex-col grow items-center justify-center my-8 mx-2 gap-y-4">
            <FetchButton onClick={onClick} isLoading={isLoading} />
            {error && <Text className='text-red-600'>{error}</Text>}
            {breed && <Text>{`A wild ${breed} appeared!`}</Text>}
            {imageData && <FetchImage randomDogUrl={imageData} breed={breed} />}
        </div>
    )
}