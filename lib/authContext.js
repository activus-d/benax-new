import React, { useState, useContext, useEffect } from 'react';
/**
 * js-cookie plugin
 * the js-cookie plugin is used here to help us manage our cookies better. The aim here is go get the JWT with the of authenticated users together with other details asd store them as cookies
 */
import Cookies from 'js-cookie' 
import { useRouter } from 'next/router'
import { getUserFromLocalCookie, getEmailFromLocalCookie, unsetToken } from '../lib/auth';
import { Magic } from 'magic-sdk'
import { MAGIC_PUBLIC_KEY } from '../utils/urls'

const AuthContext = React.createContext();


let userState = Cookies.get('username') || undefined
/**
 * Magic Declaration
 * to hold the magic public key within the component
 * magic is declared outside he component here so it can be used anywhere on the page
 */
let magic; 
const AuthProvider = ({ children }) => {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  
  const isUserLoggedinToFalse = () => {
    setIsUserLoggedin(false)
    unsetToken()
  };
  
  const isUserLoggedinToTrue = () => {
    setIsUserLoggedin(true)
  };

  /**
   * JWT AUTHENTICATION FROM STRAPI   
  */
  /**
   * useFetchUser
   * @returns {JSON} data of registered user on strapi. The dat comes together with the JSON WEB TOKEN(JWT). This is the primary authentication
   * This function checks if a user is registered or not
   */
  const useFetchUser = () => {
    const [data, setUser] = useState({
      user: userState || null,
      loading: userState === undefined,
    });

    useEffect(() => {
      if (userState !== undefined) {
        return;
      }

      let isMounted = true;
      const resolveUser = async () => {
        const user = await getUserFromLocalCookie();
        if (isMounted) {
          setUser({ user, loading: false });
        }
      };
      resolveUser();
      return () => {
        isMounted = false;
      };
    }, []);

    return data;
  };


  
    /**
     * MAGIC AUTHENTICATION
     * Magic serves as the secondary mode of authentication of this web app. the magic passwordless login is used here
     * Using magic for authentication: To register go to http://magic.link and get your credentials
     * install magic plugin in your nextJs app using "npm i magic-sdk"
     */

    /**
     * loginUser
     * Adds email to user
     * @param {*string} email
     * if the statement in the try of loginuser passes, it means the authentication was successful 
     * once the authentication is successful then the user state would be set an the apge re-routed to the homepage
     * however if the authentication is not succesful then the user state would be set to null
     */
    const loginUser = async (userDetails) => {
      const {email, name} = userDetails
      try {
        await magic.auth.loginWithMagicLink({ 
          email: email,
          redirectURI: 'http://localhost:3000/'
        })
      } catch (err) {
        
      } 
    };

    /**
     * logoutUser
     * logs out the user from magic.
     */
    const logoutUser = async() => {
      try {
        await magic.user.logout()
      } catch (err) {

      }
    };

    useEffect(() => {
      magic = new Magic(MAGIC_PUBLIC_KEY)
    }, [])

    /**
     * checkUserLoggedIn
     * @returns returns a boolean which verifies if the user is still logged in to magic or not.
     */
    const checkUserLoggedIn = async () => {
       const response = await magic.user.isLoggedIn()
       console.log(response)
       return response
    };

    const loginConfirmation = () => {
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
    }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedinToFalse,
        isUserLoggedinToTrue,
        isUserLoggedin,
        useFetchUser,
        loginUser,
        logoutUser,
        checkUserLoggedIn,
        magic,
        loginConfirmation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };



