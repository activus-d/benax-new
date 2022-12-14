import React, { useState, useEffect, useContext, useCallback } from 'react';

const GlobalContext = React.createContext();

let bagData;
let clothData;
let storedCartItemsNo;

const GlobalProvider = ({ children }) => {
    const [cartItemsNo, setCartItemsNo] = useState(0);
    const [cartBagItems, setBagCartItems] = useState([]);
    const [cartClothItems, setClothCartItems] = useState([]);

    const useFetchData = () => {
      const [bags, setBags] = useState([]);
      const [cloths, setCloths] = useState([]);

      const fetchBags = useCallback(async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/bags?populate=*`)
          const data = await response.json()
          setBags(data)
        } catch (err) {
          
        }
      }, []);

      const fetchCloths = useCallback(async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/cloths?populate=*`)
          const data = await response.json()
          setCloths(data)
        } catch (err) {
          
        } 
      }, []);

      useEffect(() => {
        fetchBags()
        fetchCloths()
      }, [fetchBags, fetchCloths]);

      return [bags, cloths];
    }
    

    useEffect(() => {
      if(localStorage.getItem('storedCartNo') !== null) {
        setCartItemsNo( +(JSON.parse(localStorage.getItem('storedCartNo'))) )
      };
      if(localStorage.getItem('storedBagDataCart') !== null) {
        setBagCartItems(JSON.parse(localStorage.getItem('storedBagDataCart')))
      };
      if(localStorage.getItem('storedClothDataCart') !== null) {
        setClothCartItems(JSON.parse(localStorage.getItem('storedClothDataCart')))
      };
    }, []);
    
    const addCartItemNo = (quantity) => {
        setCartItemsNo(cartItemsNo + quantity)
    };
    const deductCartItemNo = (quantity) => {
        setCartItemsNo(cartItemsNo - quantity)
    };

    const removeCartItem = (category, id, slug, quantity) => {
      let newBagItems;
      let newClothItems;
      if(category === 'bag') {
        newBagItems = cartBagItems.filter(cartItem => cartItem.id !== id)
        setBagCartItems(newBagItems)
        bagData = newBagItems
        localStorage.setItem('storedBagDataCart', JSON.stringify(newBagItems))
      }
      if(category === 'cloth') {
        newClothItems = cartClothItems.filter(cartItem => cartItem.id !== id)
        setClothCartItems(newClothItems)
        clothData = newClothItems
        localStorage.setItem('storedClothDataCart', JSON.stringify(clothData))
      }
      const priorCartItemsNum = storedCartItemsNo
      setCartItemsNo(cartItemsNo - Number(quantity))
      storedCartItemsNo = priorCartItemsNum - 1
      localStorage.setItem('storedCartNo', storedCartItemsNo)
    };
    
    const addToCart = (item) => {
        if(item.category === 'bag') {
          if(cartBagItems.every(cartItem => cartItem.id !== item.id)) {
            setBagCartItems([...cartBagItems, item]);
            bagData = [...cartBagItems, item]
            localStorage.setItem('storedBagDataCart', JSON.stringify(bagData))
            storedCartItemsNo = cartItemsNo + 1
            localStorage.setItem('storedCartNo', storedCartItemsNo)
            setCartItemsNo(cartItemsNo + 1)
          }
        }
        if(item.category === 'cloth') {
          if(cartClothItems.every(cartItem => cartItem.id !== item.id)) {
            setClothCartItems([...cartClothItems, item]);
            clothData = [...cartClothItems, item]
            localStorage.setItem('storedClothDataCart', JSON.stringify(clothData))
            storedCartItemsNo = cartItemsNo + 1
            localStorage.setItem('storedCartNo', storedCartItemsNo)
            setCartItemsNo(cartItemsNo + 1)
          }
        }
    };

  return (
    <GlobalContext.Provider
      value={{
        useFetchData,
        cartItemsNo,
        addCartItemNo,
        deductCartItemNo,
        removeCartItem,
        addToCart,
        cartBagItems,
        cartClothItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalProvider };