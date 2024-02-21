import { useState, useEffect } from 'react'

export type WindowSizeType = {
    width: number,
    height: number
}

const useWindowSize = (): WindowSizeType => {
    const [width, setWidth] = useState(256)
    const [height, setHeight] = useState(256)

    useEffect(() => {
        const updateSize = () => {
            const windowWidth = window.innerWidth;

            if (windowWidth >= 1280) {
                setWidth(640)
                setHeight(640)
            } else if (windowWidth >= 1024) {
                setWidth(512)
                setHeight(512)
            } else if (windowWidth >= 768) {
                setWidth(384)
                setHeight(384)
            } else {
                setWidth(256)
                setHeight(256)
            }
        }

        window.addEventListener("resize", updateSize)

        return () => window.removeEventListener("resize", updateSize)
    })

    return { width, height }
}

export default useWindowSize