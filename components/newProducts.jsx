import React, {useState} from 'react';

import { products } from './data';

export default function NewProduct() {
    const [jackets, setJackets] = useState(products[0]);
    const product1 = jackets.items[0];
    const product2 = jackets.items[1];
    const product3 = jackets.items[2];

    const trial = (e) => {
        const category = products.filter(product => product.category === e.currentTarget.dataset.category)
        console.log(category)
    };

    return (
        <section className='px-5 w-full md:px-14 text-deepBlue py-5'>
            <h2 className='py-5 text-2xl sm:text-4xl'>NEW PRODUCTS</h2>
            <div className='grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12'>
                <div className='h-[400px] lg:col-span-6 border' key={product1.id} data-category="jackets">
                    <img 
                        src={product1.src}
                        className='w-full h-full'
                    />
                    {/* <span>
                        {product1.product} 
                    </span>
                    <p>
                        {`$${product1.price}`} 
                    </p> */}
                </div>
                <div className='h-[400px] lg:h-[300px] lg:col-span-3' key={product2.id} data-category="jackets" onClick={trial}>
                    <img 
                        src={product2.src}
                        className='w-full h-full'
                    />
                    {/* <span>
                        {product2.product} 
                    </span>
                    <p>
                        {`$${product1.price}`} 
                    </p> */}
                </div>
                <div className='h-[400px] lg:col-span-3 lg:h-[300px] self-end' key={product3.id} data-category="jackets">
                    <img 
                        src={product3.src}
                        className='w-full h-full'
                    />
                    {/* <span>
                        {product3.product} 
                    </span>
                    <p>
                        {`$${product1.price}`} 
                    </p> */}
                </div>
            </div>
        </section>
    )
}