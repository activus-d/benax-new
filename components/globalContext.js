import React, { useState, useEffect, useContext } from 'react';

const GlobalContext = React.createContext();

let bagData;
let clothData;
let storedCartItemsNo;

const GlobalProvider = ({ children }) => {
    const [cartItemsNo, setCartItemsNo] = useState(0);
    const [cartBagItems, setBagCartItems] = useState([]);
    const [cartClothItems, setClothCartItems] = useState([]);

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
    
    const addCartItem = () => {
        setCartItemsNo(cartItemsNo + 1)
    };

    const removeCartItem = (category, id, slug) => {
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
      setCartItemsNo(cartItemsNo - 1)
      storedCartItemsNo = cartItemsNo - 1
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
        cartItemsNo,
        addCartItem,
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