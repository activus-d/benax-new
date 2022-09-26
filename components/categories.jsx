import React from 'react';
import {BsArrowRight} from 'react-icons/bs';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Categories() {
    const handleToast = (id) => {
        toast('loading...', id)
    };

    return (
        <section className='pt-10 px-5 basis-1/2 font-semibold md:px-14 lg:pl-14 lg:pr-0' id='categories'>
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
                        onClick={() => handleToast({toastId: "cartegories1"})}
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
                        onClick={() => handleToast({toastId: "cartegories2"})}
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