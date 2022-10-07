import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import Router from 'next/router';

import { GiReturnArrow } from 'react-icons/gi';

import { fetcher } from "../lib/api";
import { useGlobalContext } from "../components/globalContext";
import { useAuthContext } from "../lib/authContext";

/**
 * bagsData
 * take in bags addeded
 * to be exported to the cart page
 */
export let bagsData;
const BagList = ({bags}) => {
    const { isUserLoggedin } = useAuthContext();
    const { addToCart } = useGlobalContext();

    /**
     * useSWR 
     * helps us enable pagination of our api data
     * first parameter would be the api url
     * second parameter is the fetcher function
     * third parameter. This is used to cached the data. The useSWR would send a request to the server to revalidate if there is an update in the data
     */
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`,
        fetcher,
        {
            fallbackData: bags 
        }
    );

    const addNotice = (product_name) => toast.success(
        `${product_name} added to cart`
    );
    
    const handleAddToCart = (category, id, slug, product_name) => {
        if(isUserLoggedin) {
            const item = {category, id, slug}
            addToCart(item)
            addNotice(product_name)
        }else {
            Router.push('/login')
        }
    };

    return (
        <section className="text-deepBlue mb-7 px-5 md:px-14" style={{zIndex: '0'}}>
            <div className='mb-5 relative'>
                <button 
                    className='flex justify-center items-center bg-deepBlue text-veryLightGrey rounded-md h-8 w-20 absolute left-0'
                    onClick={() => Router.push('/categories')}
                >
                    <GiReturnArrow />
                    <span className='text-[8px]'>categories</span>
                </button>
                <h2 className="text-center text-3xl">BAGS</h2>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-x-28 xl:gap-y-10">
                {data.data.map(item => {
                    const {id, attributes} = item
                    const {product_name, product_image, product_price, slug, category} = attributes;
                    const {data} = product_image
                    const {formats} = data.attributes
                    const {small} = formats
                    return (
                        <div key={id} className="align-self-center justify-self-center relative mb-7 sm:mb-0">
                            <img 
                            src={small.url}
                                className='sm:h-60 sm:w-60 md:h-80 md:w-80'
                            />
                            <p>{product_name}</p>
                            <p>{`$${product_price}`}</p>
                            <button 
                                className='bg-deepBlue text-veryLightGrey px-4 py-1 hover:scale-110'
                                onClick={() => handleAddToCart(category, id, slug, product_name)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    )
                })}
            </div>
            {isUserLoggedin && 
                <button
                className='block mx-auto mt-10 mb-2 w-72 py-3 bg-green-500 text-white text-xl rounded-md'
                    onClick={() => Router.push('/cart')}
                >
                    Confirm Order
                </button>}
        </section>
    )
}
export async function getStaticProps() {
    const bagsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`);
    return {
        props: {
            bags: bagsResponse
        }
    }
}

export default BagList