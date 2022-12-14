import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { toast } from 'react-toastify';

import {IoIosMenu} from 'react-icons/io';
import {IoIosClose} from 'react-icons/io';
import { BsCart } from 'react-icons/bs';

import { useGlobalContext } from '../globalContext';
import { useAuthContext } from '../../lib/authContext';
import { unsetToken } from '../../lib/auth';

export default function MobileBar() {
    const [isMobileNavHeight, setIsMobileNavHeight] = useState(false);
    const ulRef = useRef(null);
    const { cartItemsNo, user } = useGlobalContext();
    const [navCartDisplay, setNavCartDisplay] = useState(0);
    const { isUserLoggedin, isUserLoggedinToFalse } = useAuthContext();

    const handleNav = () => {
        const element = ulRef.current
        if(!element.classList.contains('show')) {
            setIsMobileNavHeight(true)
            element.classList.add('show')
        }else {
            setIsMobileNavHeight(false)
            element.classList.remove('show')
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const element = ulRef.current
            if(element.classList.contains('show')) {
            setIsMobileNavHeight(false)
            element.classList.remove('show')
        }
        return () => {
            clearTimeout(timeout)
        }
        }, 8000)
    }, [ulRef, isMobileNavHeight]);

    const handleLogout = (e) => {
        e.preventDefault()
        unsetToken()
        isUserLoggedinToFalse()
        Router.push('/')
    };

    useEffect(() => {
        if(isUserLoggedin) {
            setNavCartDisplay(cartItemsNo)
        }else {
            setNavCartDisplay(0)
        }
    }, [isUserLoggedin]);

    if (isUserLoggedin) {
        return(
            <nav className='md:hidden px-5 text-deepBlue'>
                <div className='flex justify-between items-center mb-4'>
                    <Link href="/">
                        <span className='font-logo'>BENAX COLLECTION</span>
                    </Link>
                    <div className=' relative flex justify-center items-center px-3'
                        onClick={() => toast('loading...', {toastId: "mobile1"})}
                    >
                        <Link href='/cart'>
                            <a className='flex justify-center items-center'>
                                <BsCart className='text-[2.2rem]' />
                                <span className='absolute top-[2px] text-red-500 font-bold'>{isUserLoggedin ? cartItemsNo : 0}</span>
                            </a>
                        </Link>
                    </div>
                    {!isMobileNavHeight ? 
                        <button onClick={handleNav}>
                            <IoIosMenu className='text-5xl'/>
                        </button> :
                        <button onClick={handleNav}>
                            <IoIosClose className='text-5xl'/>
                        </button>
                    }
                </div>
                <ul className={`text-[lightGrey] h-0 overflow-hidden duration-300 ease-linear`} ref={ulRef}>
                    <li className='h-10 flex items-center px-5 '>
                        <Link href='/categories'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                            SHOP
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5'>
                        <Link href='/studio'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                                COLLECTION
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5 '>
                        <Link href='bookAppointment'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                                BOOKING
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5'>
                        <button
                            onClick={(e) => handleLogout(e)}
                        >
                            LOGOUT
                        </button>
                    </li>
                </ul>
            </nav>
        )
    };

    if (!isUserLoggedin) {
        return(
            <nav className='md:hidden px-5 text-deepBlue'>
                <div className='flex justify-between items-center mb-4'>
                    <Link href="/">
                        <span className='font-logo'>BENAX COLLECTION</span>
                    </Link>
                    <div className=' relative flex justify-center items-center px-3'>
                        <Link href='/cart'>
                            <a className='flex justify-center items-center'>
                                <BsCart className='text-[32px]' />
                                <span className='absolute top-[1px] text-red-500 font-bold'>{navCartDisplay}</span>
                            </a>
                        </Link>
                    </div>
                    {!isMobileNavHeight ? 
                        <button onClick={handleNav}>
                            <IoIosMenu className='text-5xl'/>
                        </button> :
                        <button onClick={handleNav}>
                            <IoIosClose className='text-5xl'/>
                        </button>
                    }
                </div>
                <ul className={`text-[lightGrey] h-0 overflow-hidden duration-300 ease-linear`} ref={ulRef}>
                    <li className='h-10 flex items-center px-5 '>
                        <Link href='/categories'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                            SHOP
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5'>
                        <Link href='/studio'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                                COLLECTION
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5 '>
                        <Link href='bookAppointment'>
                            <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                                BOOKING
                            </span>
                        </Link>
                    </li>
                    <li className='h-10 flex items-center px-5'>
                        <button
                            onClick={() => Router.push('/login')}
                        >
                            LOGIN
                        </button>
                    </li>
                    <li className='h-10 flex items-center px-5'>
                        <button
                            onClick={() => Router.push('/register')}
                        >
                            REGISTER
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}