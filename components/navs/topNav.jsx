import React, { useState, useEffect } from 'react'
import { BsCart } from 'react-icons/bs'
import Link from 'next/link'
import { useGlobalContext } from '../globalContext'
import { useAuthContext } from '../../lib/authContext'
import { unsetToken } from '../../lib/auth'

export default function TopNav() {
    const { cartItemsNo, user } = useGlobalContext()
    const [navCartDisplay, setNavCartDisplay] = useState(0)
    const { isUserLoggedin, isUserLoggedinToFalse } = useAuthContext()

    const handleLogout = (e) => {
        e.preventDefault()
        unsetToken()
        isUserLoggedinToFalse()
    }

    useEffect(() => {
        if(isUserLoggedin) {
            setNavCartDisplay(cartItemsNo)
        }else {
            setNavCartDisplay(0)
        }
    }, [isUserLoggedin])

    if(isUserLoggedin) {
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
                            <a>STUDIO</a>
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
                    {
                        /**
                         * Future Update
                         * Studio
                         */
                    }
                    {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>STUDIO</li> */}
                    <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>ABOUT</li>
                    {
                        /**
                         * Future Update
                         * search functionality
                         */
                    }
                    {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        <button>
                            <BsSearch />
                        </button>
                    </li> */}
                    <li className=' relative mr-7'>
                        <Link href='/cart'>
                            <a className='flex justify-center items-center'>
                                <BsCart className='text-[32px]' />
                                <span className='absolute top-[5px] text-red-500 font-bold'>{isUserLoggedin ? cartItemsNo : 0}</span>
                            </a>
                        </Link>
                    </li>
                    <li className=' hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>
                        <a
                            onClick={handleLogout}
                        >
                            LOGOUT {user}
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }

    if(!isUserLoggedin) {
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
                    {
                        /**
                         * Future Update
                         * Studio
                         */
                    }
                    {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>STUDIO</li> */}
                    <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>ABOUT</li>
                    {
                        /**
                         * Future Update
                         * search functionality
                         */
                    }
                    {/* <li className='mr-7 hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        <button>
                            <BsSearch />
                        </button>
                    </li> */}
                    <li className=' relative mr-7'>
                        <Link href='/cart'>
                            <a className='flex justify-center items-center'>
                                <BsCart className='text-[32px]' />
                                <span className='absolute top-[5px] text-red-500 font-bold'>{navCartDisplay}</span>
                            </a>
                        </Link>
                    </li>
                    <li className=' hover:border-b-2 hover:border-b-veryDeepBlue hover:font-bold cursor-pointer flex items-center'>
                        <Link href='/login'>
                            <a>REGISTER / LOGIN</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }

}