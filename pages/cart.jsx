import React, { useState, useEffect } from 'react'
import { useGlobalContext } from "../components/globalContext";
// import { fetcher } from "../lib/api";

const Cart = ({cloths}) => {
    const {cartItems} = useGlobalContext()
    const [items, setItems] = useState([])
    const collection = []
    // console.log(cartItems)
    // console.log(cloths)
    // const fetchData = () => {
    //     cartItems.forEach((item) => {
    //         const {id, category} = item
    //         fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${category}s/${id}?populate=*`)
    //             .then(res => res.json())
    //             .then(data => collection.push(data))
    //         // setItems([...items, data])
    //         console.log(collection)
    //     })
    // }
    

    const fetchData = async () => {
        const response =  await Promise.all(cartItems.map(item => {
            const {id, category} = item
            fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${category}s/${id}?populate=*`)
                .then(res => res.json())
                .then(data => data)
        }))
         
            
            
        // setItems([...items, data])
        console.log(response)
    }

    useEffect(() => {
        fetchData()
        
        // console.log(items)
    }, [])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log(items)
    //     }, 2000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // })
    
    
    return (
        <section>
            {/* {items.map(item => {
                return <div>{item.data.attributes.product_name}</div>
            })} */}
        </section>
    )
}


export default Cart