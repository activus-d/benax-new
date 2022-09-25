import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

import { useAuthContext } from '../lib/authContext';
import { useGlobalContext } from "../components/globalContext";
import { fetcher } from '../lib/api';

import getStripe from '../lib/stripe';


const Cart = ({bagsData, clothsData}) => {
    let storedBags;
    let storedCloths;
    let storedNo;
    
    useEffect(() => {
        if(localStorage.getItem('storedBagDataCart') !== null) {
            storedBags = JSON.parse(localStorage.getItem('storedBagDataCart') )
        };
        if(localStorage.getItem('storedClothDataCart') !== null) {
            storedCloths = JSON.parse(localStorage.getItem('storedClothDataCart'))
        };
        if(localStorage.getItem('storedCartNo') !== null) {
            storedNo = JSON.parse(localStorage.getItem('storedCartNo'))
        };
    }, [])

    const { cartBagItems, cartClothItems, removeCartItem } = useGlobalContext();
    const { isUserLoggedin } = useAuthContext();
    const [items, setItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    
    useEffect(() => {
        let filteredBags = bagsData.data.filter(bag => {
            let item;
            cartBagItems.forEach(cartItem => {
                if(cartItem.id === bag.id) item = cartItem.id
            })
            return bag.id === item
        });

        let filteredCloths = clothsData.data.filter(cloth => {
            let item;
            cartClothItems.forEach(cartItem => {
                if(cartItem.id === cloth.id) item = cartItem.id
            })
            return cloth.id === item
        });

        filteredBags = filteredBags.map(bag => {
            return {...bag, quantity: 1};
        });

        filteredCloths = filteredCloths.map(cloth => {
            return {...cloth, quantity: 1};
        });
        setItems([...items, ...filteredBags, ...filteredCloths]);
    }, []);
    

    useEffect(() => {
        const total = items.map(item => item.attributes.payout_product_price)
                    .reduce((prevCost, acc) => +prevCost + +acc, 0);
        setTotalCost(+total.toFixed(2));
    }, [items]);

    const addQuantity = (product_name, slug, quantity, product_price) => {
        let oldPrice;
        const newItems = items.map(item => {
            if(item.attributes.slug !== slug) {
                return item
            }else {
                const {attributes, quantity} = item
                oldPrice = (attributes.payout_product_price).toFixed(2)
                return {
                    ...item, 
                    attributes: {
                        ...attributes, 
                        payout_product_price: Number(oldPrice) + Number(product_price) 
                    },
                    quantity: quantity + 1
                };
            };
        });
        setItems(newItems);
        toast.success(
            `${+quantity + 1} ${product_name} in cart`
        );        
    };
    
    const deductQuantity = (product_name, slug, quantity, product_price, category) => {
        let oldPrice; 
        if(quantity > 1) {
            const newItems = items.map(item => {
                if(item.attributes.slug !== slug) {
                    return item
                }else {
                    const {attributes} = item;
                    oldPrice = (attributes.payout_product_price).toFixed(2);
                    console.log(Number(oldPrice) - Number(product_price) + ' deduct')
                    return {
                        ...item,
                        attributes: {
                            ...attributes,
                            payout_product_price: Number(oldPrice) - Number(product_price) 
                        },
                        quantity: +quantity - 1
                    };
                };
            });
            setItems(newItems);
            toast.success(
                `1 ${product_name} removed to cart`
            );
        }
    };

    const removeItem = (product_name, category, id, slug) => {
        const newItems = items.filter(item => item.attributes.slug !== slug);
        setItems(newItems);
        removeCartItem(category, id, slug)
        toast.info(
            `all ${product_name} item(s) removed from cart`
        );
    };
    
    const handleBuy = async()=>{
        const stripe = await getStripe()
        const res = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(items),
        })
        if(res.statusCode === 500) return
        const data = await res.json()
        toast('Redirecting...', {toastId: 'cart1'})
        stripe.redirectToCheckout({sessionId: data.id})
    };

    if(!isUserLoggedin) {
        toast('please login', {toastId: 'cart2', closeOnClick: true, autoClose: 5000,})
        return (
            <section className='h-12'>
            </section>
        )
    };

    if(isUserLoggedin) { 
        return (
            <>
            <section className='text-deepBlue mx-5 md:mx-20 lg:mx-28 flex flex-col items-center relative'>
                <h2 className='font-bold py-2 mb-4 border-b-2 border-lightGrey'>SHOPPING BAG {`(${items.    length})`}</h2>
                {items.map((item) => {
                    const {attributes, id, quantity} = item
                    const {product_name, product_image, product_price, slug, category} = attributes;
                    const {data} = product_image
                    const {formats} = data.attributes
                    const { small} = formats
                    return (
                        <div key={slug} className='grid grid-cols-2 justify-between mb-7 bg-veryLightGrey   w-full'>
                            <img 
                                src={small.url}
                                className='h-52 w-52'
                            />
                            <div className='flex flex-col gap-y-2 self-center justify-self-end mx-5 max-w-[135px]'>
                                <h3>{product_name}</h3>
                                <div className='flex w-32 h-7 bg-white grid grid-cols-3'>
                                    <button 
                                        onClick={() => deductQuantity(product_name, slug, quantity,     product_price, category)}
                                        className='text-white bg-deepBlue flex justify-center   items-center text-2xl'
                                    >
                                        <AiOutlineMinus />
                                    </button>
                                    <p className='text-center font-bold'>{quantity}</p>
                                    <button 
                                        onClick={() => addQuantity(product_name, slug, quantity,    product_price, category)}
                                        className='text-white bg-deepBlue flex justify-center   items-center text-2xl'
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                                <h3>{`$${product_price}`}</h3>
                                <button
                                    onClick={() => removeItem(product_name, category, id, slug)}
                                    className='w-32 h-7 bg-deepBlue text-white'
                                >
                                    REMOVE
                                </button>
                            </div>
                        </div>
                    )
                })}
                <div className='mb-4 flex flex-col justify-center items-between w-full font-bold'>
                    <div className='flex justify-between my-3 px-5 border-2 py-2'>
                        <p>Subtotal: </p>
                        <p>{`$${totalCost}`}</p>
                    </div>
                    <div className='flex justify-between mb-3 px-5 border-2 py-2'>
                        <p>Shipping: </p>
                        <p>$0:00</p>
                    </div>
                    <div className='flex justify-between mb-3 px-5 border-2 py-2'>
                        <p>Total Cost: </p>
                        <p>{`$${totalCost}`}</p>
                    </div>
                </div>
                <button
                    className='block mx-auto mt-1 mb-5 w-72 py-3 bg-green-500 font-medium text-white text-2xl rounded-md'
                        onClick={handleBuy}
                    >
                        Pay
                </button>
            </section>
            </>
        )
    };
}

export async function getStaticProps() {
    const bagsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`);
    const clothsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cloths?populate=*`);
    return {
        props: {
            bagsData: bagsResponse,
            clothsData: clothsResponse
        }
    }
};


export default Cart