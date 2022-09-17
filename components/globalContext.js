import React, { useState, useContext } from 'react';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    //STATE AND FUNCTIONS FOR MANAGING CART ITEMS
    const [cartItemsNo, setCartItemsNo] = useState(0);
    const [cartBagItems, setBagCartItems] = useState([]);
    const [cartClothItems, setClothCartItems] = useState([]);
    const addCartItem = () => {
        setCartItemsNo(cartItemsNo + 1)
    };
    const removeCartItem = (category, id, slug) => {
      let newBagItems;
      let newClothItems;
      if(category === 'bag') {
        newBagItems = cartBagItems.filter(cartItem => cartItem.id !== id)
        setBagCartItems(newBagItems)
      }
      if(category === 'cloth') {
        newClothItems = cartClothItems.filter(cartItem => cartItem.id !== id)
        setClothCartItems(newClothItems)
      }
      setCartItemsNo(cartItemsNo - 1)
    };
    const addToCart = (item) => {
        if(item.category === 'bag') {
          if(cartBagItems.every(cartItem => cartItem.id !== item.id)) {
            setBagCartItems([...cartBagItems, item]);
            setCartItemsNo(cartItemsNo + 1)
          }
        }
        if(item.category === 'cloth') {
          if(cartClothItems.every(cartItem => cartItem.id !== item.id)) {
            setClothCartItems([...cartClothItems, item]);
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
        cartClothItems
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalProvider };