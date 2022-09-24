import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { toast } from 'react-toastify';
import Router from 'next/router'

import { GiReturnArrow } from 'react-icons/gi'

import { fetcher } from "../lib/api"
import { useGlobalContext } from "../components/globalContext"
import { useAuthContext } from "../lib/authContext"

/**
 * bagsData
 * take in bags addeded
 * to be exported to the cart page
 */
export let bagsData;
const BagList = ({bags}) => {
    const { isUserLoggedin } = useAuthContext()
    const { addToCart } = useGlobalContext()

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
    )

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
    }

    return (
        <section className="text-deepBlue mb-7 px-5 md:px-14" style={{zIndex: '0'}}>
            <div className='mb-5 relative'>
                <button 
                    className='flex justify-center items-center bg-deepBlue text-veryLightGrey  rounded-md h-8 w-14 absolute left-0'
                    onClick={() => Router.push('/categories')}
                >
                    <GiReturnArrow />
                </button>
                <h2 className="text-center text-3xl">BAGS</h2>
            </div>
            <div className="sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-x-28 xl:gap-y-10">
                {data.data.map(item => {
                    const {id, attributes} = item
                    const {product_name, product_image, product_price, slug, category} = attributes;
                    const {data} = product_image
                    const {formats} = data.attributes
                    const {large, medium, small} = formats
                    return (
                        <div key={id} className="align-self-center justify-self-center relative mb-7 sm:mb-0">
                            <img 
                            src={'http://localhost:1337' + small.url}
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
                            {
                                /**
                                 * Future Update
                                 * ability to add items as favourites
                                 */
                            }
                            {/* <button className="absolute top-5 right-5 text-fav">
                                <MdOutlineFavorite className="text-2xl"/>
                            </button> */}
                        </div>
                    )
                })}
            </div>
            {
                /**
                 * Future Update
                 * ability to to confirm order and saved item added to cart to server to enable retrieval upon relogging in as a user
                 */
            }
            {/* {
                isUserLoggedin && !isOrderConfirmed && 
                <button
                className='block mx-auto mt-16 mb-2 w-72 py-3 bg-[#0BA065] text-veryLightGrey rounded-md'
                    onClick={confirmOrder}
                >
                    Confirm Order
                </button>}
            {
                isOrderConfirmed && 
                <div className='mt-12 flex flex-col items-center md:justify-center'>
                    <Link href='/categories'>
                        <a className='py-2 bg-deepBlue w-72 flex justify-center text-veryLightGrey rounded-t-md md:mx-14'>
                            Goto Categories
                        </a>
                    </Link>
                    <Link href='/cart'>
                        <a className='py-2 bg-[#CF270B] w-72 flex justify-center text-veryLightGrey rounded-b-md md:mx-14'>
                            Goto Cart
                        </a>
                    </Link>
                </div>
            } */}
        </section>
    )
}
// WAYS OF FETCHING /RENDERING AN API IN NEXT JS
//for server side rendering. What this means is that any code you put here would be executed by the server and not executed by the browser. We would be using getSeverSideProps for this because we want to use SWR(stale-while-revalidate) which is about client side rendering. essentially this is a pattern in NEXT Js that allows the HTTP chache valdation strategy to be done automatically by NEXT Js. This would allow returning of a data if it is cached if it is there and also send a request that would revalidate the data and would come back for an up to date data. After determining the type of fetching you want to use then you would have to do take the following steps. (1) create a .env file in your root folder (2) create a folder in your root folder and name it lib then create an api.js file in it and then make the request. To see a result you would have to restart your server because of the .env file you created.

// export async function getServerSideProps() {
    
// }

//another option for rendering an API is getStaticProps. Thsi is for static site generation. In this case the data to be used for the page would be available to the user at build time ahead of the user request and data can come from an headless CMS for example
export async function getStaticProps() {
    const bagsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`);
    return {
        props: {
            bags: bagsResponse
        }
    }
}

export default BagList