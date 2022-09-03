import React from 'react'
import {BsArrowRight} from 'react-icons/bs'

export default function Categories() {
    return (
        <section className='pt-2 px-5 md:px-0 md:pl-14 md:mr-14 basis-1/2 font-bold'>
            <h2 className='text-3xl mb-5 text-deepBlue'>CATEGORIES</h2>
            <ul>
                <li className='flex items-center justify-between h-14 border-t border-t-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        ACCESSORIES
                    </span>
                    <BsArrowRight />
                </li>
                <li className='flex items-center justify-between h-14 border-t border-t-lightGrey border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        CLOTHING
                    </span>
                    <BsArrowRight />
                </li>
                <li className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        BAGS
                    </span>
                    <BsArrowRight />
                </li>
                <li className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        SHOES
                    </span>
                    <BsArrowRight />
                </li>
                <li className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        LIFESTYLE
                    </span>
                    <BsArrowRight />
                </li>
            </ul>
        </section>
    )
}