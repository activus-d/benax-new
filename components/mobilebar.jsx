import React, { useRef } from 'react'
import Image from 'next/image'
import logo from '../public/assets/logo.png'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaTimes} from 'react-icons/fa'
import Link from 'next/link'

import { useGlobalContext } from './context'

export default function() {
    const ulRef = useRef(null)

    const {isMobileNavHeight, mobileHeightFalse, mobileHeightTrue} = useGlobalContext()

    const handleNav = () => {
        const element = ulRef.current
        // element.classList.contains('show') ?  element.classList.remove('show') :  element.classList.add('show')
        if(!element.classList.contains('show')) {
            mobileHeightTrue()
            element.classList.add('show')
        }else {
            mobileHeightFalse()
            element.classList.remove('show')
        }
    }

    return(
        <nav className='md:hidden px-5'>
            <div className='flex justify-between mb-4'>
                <img 
                    src='/assets/logo.png'
                    className='h-14 w-80 ml-[-40px]'
                />
                {!isMobileNavHeight ? 
                    <button onClick={handleNav}>
                        <GiHamburgerMenu className='text-5xl'/>
                    </button> :
                    <button onClick={handleNav}>
                        <FaTimes className='text-5xl'/>
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
                            BOOK AN APPOINTMENT
                        </span>
                    </Link>
                </li>
                <li className='h-10 flex items-center px-5'>
                    <span className='hover:border-b-2 hover:border-black hover:border-b-veryDeepBlue hover:font-bold cursor-pointer'>
                        STUDIO
                    </span>
                </li>
            </ul>
        </nav>
    )
}