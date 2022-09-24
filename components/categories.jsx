import React from 'react'
import {BsArrowRight} from 'react-icons/bs'
import Link from 'next/link'

export default function Categories() {
    return (
        <section className='pt-10 px-5 basis-1/2 font-semibold md:px-0 md:pl-14 md:mr-14' id='categories'>
            <h2 className='text-2xl mb-5 text-deepBlue font-normal sm:text-4xl'>CATEGORIES</h2>
            <ul>
                {/* <li className='flex items-center justify-between h-14 border-t border-t-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        ACCESSORIES
                    </span>
                    <BsArrowRight />
                </li> */}
                <Link href='/clothing'>
                    <li 
                        className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'
                        data-category='clothing'
                    >
                        <span>
                                CLOTHING
                        </span>
                        <BsArrowRight />
                    </li>
                </Link>
                <Link href='/bags'>
                    <li 
                        className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'
                        data-category='bags'
                    >
                        <span>
                                BAGS
                        </span>
                        <BsArrowRight />
                    </li>
                </Link>
                {/* <li className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        SHOES
                    </span>
                    <BsArrowRight />
                </li> */}
                {/* <li className='flex items-center justify-between h-14 border-b border-b-lightGrey hover:text-lightGrey cursor-pointer'>
                    <span>
                        LIFESTYLE
                    </span>
                    <BsArrowRight />
                </li> */}
            </ul>
        </section>
    )
}