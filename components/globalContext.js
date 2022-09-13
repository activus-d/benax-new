import React, { useState, useContext } from 'react';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    //STATE AND FUNCTIONS FOR MANAGING CART ITEMS
    const [cartItemsNo, setCartItemsNo] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const addCartItem = () => {
        setCartItemsNo(cartItemsNo + 1)
    };
    const removeCartItem = () => {
        setCartItemsNo(cartItemsNo - 1)
    };
    const addToCart = (item) => {
        cartItems.every(cartItem => cartItem.id !== item.id) && (
            setCartItems([...cartItems, item]),
            setCartItemsNo(cartItemsNo + 1)
        )
    };
 
  

  return (
    <GlobalContext.Provider
      value={{
        cartItemsNo,
        addCartItem,
        removeCartItem,
        addToCart,
        cartItems
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