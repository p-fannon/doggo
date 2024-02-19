import React from 'react'
import Image from 'next/image'
import { DoggoRandomImageResponse } from './FetchComponent'

export default function FetchImage({ randomDogUrl, breed }: DoggoRandomImageResponse) {
    return (
        <div className="relative size-64 md:size-96 lg:size-[32rem] xl:size-[40rem]">
            <Image
                fill={true}
                src={randomDogUrl}
                sizes="100vw"
                style={{
                    objectFit: 'contain'
                }}
                alt={breed ? breed : 'No image description available'}
            />
        </div>
    )
}