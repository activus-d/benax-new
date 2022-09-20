import React, { useState, useEffect } from 'react';
import { icons } from 'react-icons';
import { useGlobalContext } from "../components/globalContext";
import { bagsData } from './bags';
import { clothsData } from './clothing';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import script from 'next/script'

const Cart = ({cloths}) => {
    const { cartBagItems, cartClothItems, removeCartItem } = useGlobalContext();
    const [items, setItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0)
    
    useEffect(() => {
        let filteredBags = [];
        let filteredCloths = [];
        if(bagsData) {
            filteredBags = bagsData.data.filter((bag => {
                let item = '';
                cartBagItems.forEach(cartItem => {
                    if(cartItem.id === bag.id) item = cartItem.id
                });
                return bag.id === item;
            }));
        };

        if(clothsData) {
            filteredCloths = clothsData.data.filter((cloth => {
                let item = '';
                cartClothItems.forEach(cartItem => {
                    if(cartItem.id === cloth.id) item = cartItem.id
                });
                return cloth.id === item;
            }))
        };

        filteredBags = filteredBags.map(bag => {
            return {...bag, quantity: 1};
        });

        filteredCloths = filteredCloths.map(cloth => {
            return {...cloth, quantity: 1};
        });
        setItems([...items, ...filteredBags, ...filteredCloths]);
    }, []);

    useEffect(() => {
        const total = items.map(item => item.attributes.product_price)
                    .reduce((prevCost, acc) => +prevCost + +acc, 0);
        setTotalCost(+total.toFixed(2));
    }, [items])

    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         console.log(items)
    //     }, 3000)
    // })

    const addQuantity = (slug, quantity, product_price, category) => {
        const newItems = items.map(item => {
            let originalPrice; 
            if(item.attributes.slug !== slug) {
                return item;
            }else {
                if(category === 'bag') {
                    bagsData.data.forEach(bag => {
                        return bag.attributes.slug === slug ? originalPrice = bag.attributes.product_price : '' ;
                    });
                };

                if(category === 'cloth') {
                    clothsData.data.forEach(cloth => {
                        return cloth.attributes.slug === slug ? originalPrice = cloth.attributes.product_price : '' ;
                    });
                };
                return {...item, quantity: quantity + 1, attributes: {...item.attributes, product_price: (+product_price + originalPrice).toFixed(2)}};
            }
        })
        setItems(newItems);
    };
    
    const deductQuantity = (slug, quantity, product_price, category) => {
        let originalPrice; 
        let newQuantity;
        if(quantity > 1) {
            const newItems = items.map(item => {
                if(item.attributes.slug !== slug) {
                    return item;
                }else {
                    if(category === 'bag') {
                        bagsData.data.forEach(bag => {
                            return bag.attributes.slug === slug ? originalPrice = bag.attributes.   product_price : '' ;
                        });
                    };

                    if(category === 'cloth') {
                        clothsData.data.forEach(cloth => {
                            return cloth.attributes.slug === slug ? originalPrice = cloth.attributes. product_price : '' ;
                        });
                    };

                    newQuantity = (quantity > 1 ? quantity - 1 : 1 );
                    return {...item, quantity: newQuantity, attributes: {...item.attributes, product_price: (product_price - originalPrice).toFixed(2)}};
                }
            })
            setItems(newItems);
        };
    };

    const removeItem = (category, id, slug) => {
        const newItems = items.filter(item => item.attributes.slug !== slug);
        setItems(newItems);
        removeCartItem(category, id, slug)
    };
    
    return (
        <>
        <script type="text/javascript" src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js" > </script>
        <section className='text-deepBlue mx-5 md:mx-20 lg:mx-28 flex flex-col items-center relative'>
            <h2 className='font-bold py-2 mb-4 border-b-2 border-lightGrey'>SHOPPING BAG {`(${items.length})`}</h2>
            {items.map((item) => {
                const {attributes, id, quantity} = item
                const {product_name, product_image, product_price, slug, category} = attributes;
                const {data} = product_image
                const {formats} = data.attributes
                const {large, medium, small} = formats
                return (
                    <div key={slug} className='grid grid-cols-2 justify-between mb-7 bg-veryLightGrey w-full'>
                        <img 
                            src={'http://localhost:1337' + small.url}
                            className='h-52 w-52'
                        />
                        <div className='flex flex-col gap-y-2 self-center justify-self-end mx-5 max-w-[135px]'>
                            <h3>{product_name}</h3>
                            <div className='flex w-32 h-7 bg-white grid grid-cols-3'>
                                <button 
                                    onClick={() => deductQuantity(slug, quantity, product_price, category)}
                                    className='text-white bg-deepBlue flex justify-center items-center text-2xl'
                                >
                                    <AiOutlineMinus />
                                </button>
                                <p className='text-center font-bold'>{quantity}</p>
                                <button 
                                    onClick={() => addQuantity(slug, quantity, product_price, category)}
                                    className='text-white bg-deepBlue flex justify-center items-center text-2xl'
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                            <h3>{`$${product_price}`}</h3>
                            <button
                                onClick={() => removeItem(category, id, slug)}
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
            {/* <button class="" type="button" className="SS_ProductCheckout css style" data-id="1" data-url="http://localhost:1337"> BuyNow </button> */}
        </section>
        </>
    )
}


export default Cart