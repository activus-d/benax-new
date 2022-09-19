import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import { MAGIC_PUBLIC_KEY } from '../utils/urls'

const GlobalContext = React.createContext();

let magic; //magic is declared as undefined here so it can be used anywhere on the page
let userLocalStorage;

const GlobalProvider = ({ children }) => {
    //CONTEXT FOR STATE AND FUNCTIONS FOR MANAGING CART ITEMS
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

    //CONTEXT FOR AUTHENTICATION
    /**
     * using magic for authentication. To register go to http://magic.link and get your credentials
     * then you have to install magic plugin in your nextJs app using "npm i magic-sdk"
     */
    const [user, setUser] = useState(null);
    const router = useRouter()

    /**
     * Adds email to user
     * @param {*string} email
     * if the statement in the try of loginuser passes, it means the authentication was successful 
     * once the authentication is successful then the user state would be set an the apge re-routed to the homepage
     * however if the authentication is not succesful then the user state would be set to null
     */
    const loginUser = async (userDetails) => {
      const {email, name} = userDetails
      try {
        await magic.auth.loginWithMagicLink({ email })
        localStorage.setItem('benaxUser', JSON.stringify(userDetails))
        setUser(name)
        router.push('/')
      } catch (err) {
        setUser(null)
      }
      
    }

    /**
     * sets the user to null/log user out
     * here we are logging out the user from magic and once that is successful then the user state is set to null and the user is re-routed back to the homepage
     */
    const logoutUser = async() => {
      try {
        await magic.user.logout()
        localStorage.removeItem('benaxUser')
        setUser(null)
        router.push('/')
      } catch (err) {

      }
    }

    const checkUserLoggedIn = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn()
        if(isLoggedIn) {
          const { email } = await magic.user.getMetadata()
          userLocalStorage = JSON.parse(localStorage.getItem('benaxUser'))
          if(userLocalStorage.email === email) {
            setUser(userLocalStorage.name)
          }else {
            setUser(email)
          }
        }
      } catch (err) {

      }
    } 

    /**
     * We have to call magic within a useEffect hook
     */
    // useEffect(() => {
    //   magic = new Magic(MAGIC_PUBLIC_KEY)
    //   checkUserLoggedIn()
    // }, [])
 
  

  return (
    <GlobalContext.Provider
      value={{
        cartItemsNo,
        addCartItem,
        removeCartItem,
        addToCart,
        cartBagItems,
        cartClothItems,
        user, 
        loginUser,
        logoutUser
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