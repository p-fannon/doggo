import React, { useState } from 'react'
import axios from 'axios'
import FetchButton from './FetchButton'
import { Text } from '@chakra-ui/react'
import Image from 'next/image'
import FetchImage from './FetchImage'

type DoggoRandomImageResponse = {
    statusCode: number;
    headers: Record<string, string>,
    body: ArrayBuffer,
    isBase64Encoded: boolean,
    breed: string
}

export default function FetchComponent() {
    const [imageData, setImageData] = useState<ArrayBuffer>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [breed, setBreed] = useState<string>('')

    const onClick = async () => {
        setIsLoading(true)
        setError('')
        try {
            await axios.get(`https://${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/FetchRandomDog`)
            .then((res) => res.data)
            .then((apiResponse: DoggoRandomImageResponse) => {
                setImageData(apiResponse.body)
                setBreed(apiResponse.breed)
            })
        } catch (e) {
            setError('Could not fetch a dog')
        } finally { setIsLoading(false) }
    }

    return (
        <>
            <FetchButton onClick={onClick} isLoading={isLoading} />
            <div className="font-body">
                {error && <Text className='text-red-600'>{error}</Text>}
                {breed && <Text>{`A wild ${breed} appeared!`}</Text>}
                {imageData && <FetchImage imageData={imageData} breed={breed} />}
            </div>
        </>
    )
}