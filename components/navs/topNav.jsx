import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { BsCart } from 'react-icons/bs'
import Link from 'next/link'
import { useGlobalContext } from '../globalContext'

export default function TopNav() {
    const { cartItemsNo, user } = useGlobalContext()
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
                        <a>BOOKING</a>
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
            <ul className='flex justify-center justify-self-end'>
                {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>STUDIO</li> */}
                <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>ABOUT</li>
                {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                    <button>
                        <BsSearch />
                    </button>
                </li> */}
                <li className=' relative mr-7'>
                    <Link href='/cart'>
                        <a className='flex justify-center items-center'>
                            <BsCart className='text-[32px]' />
                            <span className='absolute top-[5px] text-red-500 font-bold'>{cartItemsNo}</span>
                        </a>
                    </Link>
                </li>
                <li className=' hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>
                    {user ? (
                        <Link href='/account'>
                            <a>{user}</a>
                        </Link>
                    ) : (
                        <Link href='/login'>
                            <a>LOGIN</a>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    )
}