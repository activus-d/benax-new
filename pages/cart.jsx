import React, { useState, useEffect } from 'react'
import { useGlobalContext } from "../components/globalContext";
// import { fetcher } from "../lib/api";

const Cart = ({cloths}) => {
    const {cartItems} = useGlobalContext()
    const [items, setItems] = useState([])
    console.log(cartItems)
    console.log(cloths)
    // const fetchData = async (id, category) => {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${category}s/${id}?populate=*`)
    //     const data = await response.json()
    //     setItems((prevVal) => {
    //         return [...prevVal, data]
    //     })
    // }

    useEffect(() => {
        cartItems.forEach(item => {
            const {id, category} = item
            // fetchData(id, category)
            fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${category}s/${id}?populate=*`)
                .then(response => response.json())
                .then(data => {
                    setItems((prevVal) => {
                        return [...prevVal, data]
                    })
                })
        });
        console.log(items)
    }, [])
    
    
    return (
        <section>
            {items.map(item => {
                return <div>{item.data.attributes.product_name}</div>
            })}
        </section>
    )
}

// export async function getStaticProps() {
//     const clothsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cloths/1/?populate=*`);
//     // console.log(process.env.NEXT_PUBLIC_STRAPI_URL)
//     return {
//         props: {
//             cloths: clothsResponse
//         }
//     }
// }


export default Cart