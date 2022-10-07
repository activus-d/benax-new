import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useGlobalContext } from './globalContext';
import { topSectionImages } from './data'

export default function TopSection() {
    const [sales, setSales] = useState([])
    const [randomDisplay, setRandomDisplay] = useState(topSectionImages[0].src)
    const [windowWidth, setWindowWidth] = useState(0)
    const { useFetchData } = useGlobalContext()
    const [bags, cloths] = useFetchData()

    useEffect(() => {
        setSales([...(bags.data || []), ...(cloths.data || [])])
    }, [bags, cloths])

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        if(windowWidth <= 500) {
            const interval = setInterval(() => {
            const indexToDisplay = Math.round((Math.random() / 1) * sales.length - 1)
            const product = sales[indexToDisplay]
            if(product) {
                const {attributes} = product
                const {product_image} = attributes;
                const {data} = product_image
                const {formats} = data.attributes
                const {small} = formats
                setRandomDisplay(small.url)
            }
            }, 2000)
            return () => {
                clearInterval(interval)
            }
        }else {
            const interval = setInterval(() => {
            const indexToDisplay = Math.round((Math.random() / 1) * topSectionImages.length - 1)
            const itemToDisplay = topSectionImages[indexToDisplay]
            if(itemToDisplay) {
                setRandomDisplay(itemToDisplay.src)
            }
            }, 2000)
            return () => {
                clearInterval(interval)
            }
        }
    })

    return (
        <section className='bg-veryLightGrey relative h-[500px] flex flex-col items-center'>
            <section className='flex flex-col items-center w-[200px] absolute top-[45%] opacity-80 extraSm:w-auto'>
                <div className='bg-deepBlue text-white px-5 py-3'>
                    <span className='text-[12px] extraSm:text-[16px]'>SPRING/SUMMER 2022</span>
                    <h1 className='text-xl opacity-1 extraSm:text-4xl'>
                        <span className='text-red-500 font-bold'>Sale 30%</span>
                        <br />
                        <span>Off Everything</span>
                    </h1>
                </div>
                <Link href='#categories'>
                    <a>
                        <button className='bg-red-500 text-white mt-3 w-24 py-2 arrowDown'>
                            SHOP NOW
                        </button>
                    </a>
                </Link>
            </section>
            <section className='w-full'>
                <img 
                    src={randomDisplay}
                    alt="discounted product images"
                    className='h-[500px] w-full'
                />
            </section>
        </section>
    )
}