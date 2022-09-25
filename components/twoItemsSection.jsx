import React, {useState} from 'react';
import { products } from './data';

export default function TwoItemsSection() {
    const [bags, setBags] = useState(products[1]);
    const product1 = bags.items[0];
    const product2 = bags.items[1];

    return (
        <section className='hidden lg:grid grid-cols-2 pt-24 md:px-14 gap-x-5 basis-1/2'>
            <div key={product1.id} className='h-[400px]'>
                <img 
                    src={product1.src}
                    className='h-full'
                />
            </div>
            <div key={product2.id} className='h-[400px] md:h-[300px]'>
                <img 
                    src={product2.src}
                    className='h-full'
                />
            </div>

        </section>
    )
}