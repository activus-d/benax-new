import React from 'react'
import Image from 'next/image'
import image18 from '../public/assets/image18.jpg'
import image19 from '../public/assets/image19.jpg'
import image20 from '../public/assets/image20.jpg'
import image21 from '../public/assets/image21.jpg'

export default function JoinUs() {
    return (
        <section className='mx-14 mt-14 text-deepBlue h-40 sm:h-auto md:hidden xl:block lg:h-[27rem]'>
            <div className='flex justify-between items-center mb-5'>
                <h3 className='text-3xl'>JOIN US</h3>
                <p>@benaxCollection</p>
            </div>
            <div className='grid grid-cols-4 h-[200px] gap-x-5'>
                <div >
                    <Image 
                        src={image18}
                        height={800}
                    />
                </div>
                <div className=''>
                    <Image 
                        src={image19}
                        height={600}
                    />
                </div>
                <div>
                    <Image 
                        src={image20}
                        height={800}
                    />
                </div>
                <div className=''>
                    <Image 
                        src={image21}
                        height={600}
                    />
                </div>
            </div>
        </section>
    )
}