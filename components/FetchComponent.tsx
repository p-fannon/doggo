import React, { useState } from 'react'
import axios from 'axios'
import FetchButton from './FetchButton'
import { Text } from '@chakra-ui/react'
import FetchImage from './FetchImage'

export type DoggoRandomImageResponse = {
    breed: string
    randomDogUrl: string
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
            await axios.get(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`, {
                params: {
                    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
                }
            })
            .then((apiResponse) => {
                const { breed, randomDogUrl }: DoggoRandomImageResponse = apiResponse.data
                setImageData(randomDogUrl)
                setBreed(breed)
            })
        } catch (e) {
            setError('Could not fetch a dog')
        } finally { setIsLoading(false) }
    }

    return (
        <div className="overflow-y-auto flex flex-col mt-6 mx-2 gap-y-4 justify-center items-center">
            <FetchButton onClick={onClick} isLoading={isLoading} />
            <div className="font-body">
                {error && <Text className='text-red-600'>{error}</Text>}
                {breed && <Text>{`A wild ${breed} appeared!`}</Text>}
            </div>
            {imageData && <FetchImage randomDogUrl={imageData} breed={breed} />}
        </div>
    )
}