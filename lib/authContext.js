import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie'
import { getUserFromLocalCookie } from '../lib/auth';
const AuthContext = React.createContext();

/**
 * 
 * 
 */
let userState = Cookies.get('username') || undefined
const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false)
  
  const isLoggedinToFalse = () => {
    setIsLoggedin(false)
  };
  
  const isLoggedinToTrue = () => {
    setIsLoggedin(true)
  };


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

  return (
    <AuthContext.Provider
      value={{
        isLoggedinToFalse,
        isLoggedinToTrue,
        isLoggedin,
        useFetchUser
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };



