import React, { useEffect, useState } from 'react'
import { fetcher } from "../lib/api"
import useSWR from 'swr'
import { MdOutlineFavorite } from 'react-icons/md'
import { useGlobalContext } from "../components/globalContext"
import { useAuthContext } from "../lib/authContext"
import { getUserFromLocalCookie } from '../lib/auth'
import Router from 'next/router'

export let clothsData;

const ClothList = ({cloths}) => {
    const { isUserLoggedin, checkUserLoggedIn, isUserLoggedinToTrue } = useAuthContext()

    /**
     * checkUserLoggedIn
     * Check if on reload of the page user is logged in and authorised
     */
    useEffect(() => {
        if(!isUserLoggedin) {
            const fetchUser = async () => {
                const jwtUser =  await getUserFromLocalCookie()
                const magicCheck= await checkUserLoggedIn()
                if(jwtUser !== undefined && magicCheck === true) {
                    isUserLoggedinToTrue()
                }
            }
            fetchUser()
            .catch(err => console.log(err))
        }
    }, [isUserLoggedin])

    /**
     * useSWR 
     * helps us enable pagination of our api data
     * first parameter would be the api url
     * second parameter is the fetcher function
     * third parameter. This is used to cached the data. The useSWR would send a request to the server to revalidate if there is an update in the data
     */
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cloths?populate=*`,
        fetcher,
        {
            fallbackData: cloths 
        }
    )
    clothsData = data

    const { addCartItem, removeCartItem, addToCart, cartClothItems, cartItemsNo } = useGlobalContext()
    const handleAddToCart = (category, id, slug) => {
        if(isUserLoggedin) {
            const item = {category, id, slug}
            addToCart(item)
        }else {
            Router.push('/login')
        }
    }

    return (
        <section className="text-deepBlue mb-7 px-5 md:px-14">
            <h2 className="text-center text-3xl mb-7">CLOTHING</h2>
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
                                className='bg-deepBlue text-white px-4 py-1 hover:scale-110'
                                onClick={() => handleAddToCart(category, id, slug)}
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
        </section>
    )
}

/**
 * METHODS OF FETCHING FROM AN API IN NEXT JS
 * getServerSideProps: This is for server side rendering. What this means is that any code you put here would be executed by the server and not executed by the browser. We would be using getSeverSideProps for this because we want to use SWR(stale-while-revalidate) which is about client side rendering. essentially this is a pattern in NEXT Js that allows the HTTP chache valdation strategy to be done automatically by NEXT Js. This would allow returning of a data if it is cached if it is there and also send a request that would revalidate the data and would come back for an up to date data. After determining the type of fetching you want to use then you would have to do take the following steps. (1) create a .env file in your root folder (2) create a folder in your root folder and name it lib then create an api.js file in it and then make the request. To see a result you would have to restart your server because of the .env file you created.
 * @returns the option used here is getStaticProps. It is useful when the data required to render the page is to be made available at build time ahead of a user’s request and data can come from an headless CMS.
 * another option is to use the fetch API with the useEffect in react.
 */
export async function getStaticProps() {
    const clothsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cloths?populate=*`);
    return {
        props: {
            cloths: clothsResponse
        }
    }
}

export default ClothList