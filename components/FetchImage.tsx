import React from 'react'
import Image from 'next/image'

type FetchImageType = {
    imageData: ArrayBuffer,
    breed: string
}

export default function FetchImage({ imageData, breed }: FetchImageType) {
    return (
        <div className="relative h-20">
            <Image
                fill={true}
                src={`data:image/jpeg;base64,${imageData}`}
                alt={breed ? breed : 'No image description available'}
            />
        </div>
    )
}