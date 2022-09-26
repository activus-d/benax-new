import React from 'react';

import Image from 'next/image';
import image18 from '../public/assets/image18.jpg';
import image19 from '../public/assets/image19.jpg';
import image20 from '../public/assets/image20.jpg';
import image21 from '../public/assets/image21.jpg';

export default function BenaxCollection() {
    return (
        <section className='hidden mx-14 mt-14 text-deepBlue h-40 lg:block'>
            <p className='text-right mb-5'>@benaxCollection</p>
            <div className='flex'>
                <div className='mr-16'>
                    <Image 
                        src={image18}
                        height={150}
                        width={100}
                    />
                </div>
                <div className='mr-16'>
                    <Image 
                        src={image19}
                        height={100}
                        width={100}
                    />
                </div>
                <div className='mr-16'>
                    <Image 
                        src={image20}
                        height={150}
                        width={100}
                    />
                </div>
                <div className=''>
                    <Image 
                        src={image21}
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        </section>
    )
}

