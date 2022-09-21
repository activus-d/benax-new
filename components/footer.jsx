import React from 'react'
import { MdDoubleArrow } from 'react-icons/md'
import { FaInstagramSquare } from 'react-icons/fa'
import { ImFacebook2 } from 'react-icons/im'
import { FaTwitterSquare } from 'react-icons/fa'

export default function Footer() {
    return (
        <section className='bg-deepBlue text-veryLightGrey px-5 pb-10 md:px-14 text-[14px] sm:text-[16px]'>
            <section className='md:grid md:grid-cols-5 md:gap-x-20'>
                <div className='my-7 md:col-start-1 col-span-3'>
                    <form className='w-full text-xl my-3'>
                        <div className=' h-16 min-h-16 flex items-center'>
                            <label htmlFor='subscribe' className='mr-3 text-[14px]'>Email :</label>
                            <input name='subscribe' type='text' id='subscribe' placeholder='enter you email' className='bg-deepBlue outline-none text-[16px] w-40 sm:w-auto md:w-24 xl:w-auto' />
                        </div>
                        <button className='w-full bg-veryLightGrey text-deepBlue text-2xl font-bold flex items-center justify-center h-10 cursor-pointer sm:hover:bg-deepBlue sm:hover:text-white '>
                            <MdDoubleArrow />  
                            SUBSCRIBE
                        </button>
                    </form>
                    <p className='text-justify'>
                        Subscribe to our newsletter and receive exclusive community offers, updates on new pieces and shared stories.
                    </p>
                </div>
                <div className='md:col-start-4 md:col-span-7 md md:grid md:grid-cols-3 self-end justify-self-end'>
                    <div className='mb-7 md:mr-7'>
                        <h3 className='text-xl font-bold mb-2'>CLIENT SERVICES</h3>
                        <ul>
                            <li>Payments</li>
                            <li>Returns</li>
                            <li>Shipping</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                    <div className='mb-7 md:mr-7'>
                        <h3 className='text-xl font-bold mb-2'>THE COMPANY</h3>
                        <ul>
                            <li>Our Journal</li>
                            <li>About Benex Collections</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold mb-2'>CONTACT US</h3>
                        <ul>
                            <li>Call Us: +2348126888865</li>
                            <li>Mon-Fri: 9am - 6pm WAT</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className='flex text-2xl justify-center my-5 md:w-full md:justify-end md:px-7'>
                <FaInstagramSquare className='mr-3 hover:text-deepBlue hover:bg-white'/>
                <ImFacebook2 className='mr-3 hover:text-deepBlue hover:bg-white'/>
                <FaTwitterSquare className='hover:text-deepBlue hover:bg-white'/>
            </section>
            <section></section>
        </section>
    )
}