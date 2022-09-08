import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { BsCart } from 'react-icons/bs'
import Link from 'next/link'

export default function TopNav() {
    return (
        <nav className='hidden md:grid grid-cols-3 items-center text-veryDeepBlue text-[12px] h-24 px-14'>
            <ul className='flex'>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                    <Link href='/categories'>
                        <a>SHOP</a>
                    </Link>
                </li>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                    <Link href='/studio'>
                        <a>COLLECTION</a>
                    </Link>
                </li>
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                    <Link href='/bookAppointment'>
                        <a>BOOK AN APPOINTMENT</a>
                    </Link>
                </li>
            </ul>
            <div>
                <Link href='/'>
                    <a>
                        <img 
                            src="/assets/logo.png"
                            className='h-10 w-80'
                        />
                    </a>
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