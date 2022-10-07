import React, { useState, useContext, useEffect } from 'react';
/**
 * js-cookie plugin
 * the js-cookie plugin is used here to help us manage our cookies better. The aim here is go get the JWT with the of authenticated users together with other details asd store them as cookies
 */
import Cookies from 'js-cookie' 
import { getUserFromLocalCookie, unsetToken } from '../lib/auth';


const AuthContext = React.createContext();

let userState = Cookies.get('username') || undefined

const AuthProvider = ({ children }) => {
  const [isUserLoggedin, setIsUserLoggedin] = useState(false)
  const [data, setData] = useState({
      user: userState || null,
      loading: userState === undefined,
  });

  /**
   * useFetchUser
   * @returns {JSON} data of registered user on strapi. The dat comes together with the JSON WEB TOKEN(JWT). This is the primary authentication
   * This function checks if a user is registered or not
   */
  const useFetchUser = () => {
    useEffect(() => {
      if (userState !== undefined) {
        return;
      }

      let isMounted = true;
      const resolveUser = async () => {
        const user = await getUserFromLocalCookie();
        if (isMounted) {
          setData({ user, loading: false });
        }
      };
      resolveUser();
      return () => {
        isMounted = false;
      };
    }, []);
  };

  useFetchUser()

  useEffect(() => {
    if(data.user) (
      setIsUserLoggedin(true)
    )
  }, [data])
  
  const isUserLoggedinToFalse = () => {
    setIsUserLoggedin(false)
    unsetToken()
  };
  
  const isUserLoggedinToTrue = () => {
    setIsUserLoggedin(true)
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedinToFalse,
        isUserLoggedinToTrue,
        isUserLoggedin,
        data
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



