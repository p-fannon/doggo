import React from 'react'
import Image from 'next/image'
import { DoggoRandomImageResponse } from './FetchComponent'
import useWindowSize, { WindowSizeType } from '../hooks/useWindowSize'

const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#999999" offset="20%" />
        <stop stop-color="#cccccc" offset="50%" />
        <stop stop-color="#999999" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#999999" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

const toBase64 = (str: string) =>
    typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str)

export default function FetchImage({ randomDogUrl, breed }: DoggoRandomImageResponse) {
    const { width, height }: WindowSizeType = useWindowSize();

    return (
        <div className="relative size-64 md:size-96 lg:size-[32rem] xl:size-[40rem]">
            <Image
                fill={true}
                src={randomDogUrl}
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                sizes="100vw"
                style={{
                    objectFit: 'contain'
                }}
                alt={breed ? breed : 'No image description available'}
            />
        </div>
    )
}