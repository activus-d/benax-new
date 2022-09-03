import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { BsCart } from 'react-icons/bs'
import Link from 'next/link'

export default function TopNav() {
    return (
        <nav className='hidden md:grid grid-cols-3 items-center text-veryDeepBlue h-24 px-14'>
            <ul className='flex'>
                <Link href='/categories'>
                    <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        SHOP
                    </li>
                </Link>
                <Link href='studio'>
                    <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        COLLECTION
                    </li>
                </Link>
                <Link href='bookAppointment'>
                    <li className='hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        BOOK AN APPOINTMENT
                    </li>
                </Link>
            </ul>
            <div>
                <Link href='/homePage'>
                    <img 
                        src="/assets/logo.png"
                        className='h-14 w-96'
                    />
                </Link>
            </div>
            <ul className='flex justify-self-end'>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>STUDIO</li>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>ABOUT US</li>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                    <button>
                        <BsSearch />
                    </button>
                </li>
                <li>
                    <BsCart />
                    <span>0</span>
                </li>
            </ul>
        </nav>
    )
}