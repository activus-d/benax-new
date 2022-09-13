import React, { useRef, useState } from 'react'
import {IoIosMenu} from 'react-icons/io'
import {IoIosClose} from 'react-icons/io'
import { BsCart } from 'react-icons/bs'
import Link from 'next/link'
import { useGlobalContext } from '../globalContext'

export default function MobileBar() {
    const [isMobileNavHeight, setIsMobileNavHeight] = useState(false);
    const ulRef = useRef(null)
    const { cartItemsNo } = useGlobalContext()

    // const {isMobileNavHeight, mobileHeightFalse, mobileHeightTrue} = useNavContext()

    const handleNav = () => {
        const element = ulRef.current
        // element.classList.contains('show') ?  element.classList.remove('show') :  element.classList.add('show')
        if(!element.classList.contains('show')) {
            setIsMobileNavHeight(true)
            element.classList.add('show')
        }else {
            setIsMobileNavHeight(false)
            element.classList.remove('show')
        }
    }

    return(
        <nav className='md:hidden px-5 text-deepBlue'>
            <div className='flex justify-between items-center mb-4'>
                <Link href="/">
                    <span className='font-logo'>BENAX COLLECTION</span>
                </Link>
                <div className=' relative flex justify-center items-center'>
                    <Link href='/cart'>
                        <a className='flex justify-center items-center'>
                            <BsCart className='text-[28px]' />
                            <span className='absolute top-[0px] text-red-500 font-bold'>{cartItemsNo}</span>
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