import React, { useState, useContext } from 'react';

const NavContext = React.createContext();

const NavProvider = ({ children }) => {
  const [isMobileNavHeight, setIsMobileNavHeight] = useState(false);

  const mobileHeightTrue = () => {
    return setIsMobileNavHeight(true)
  };
  const mobileHeightFalse = () => {
    return setIsMobileNavHeight(false)
  };
  

  return (
    <NavContext.Provider
      value={{
        isMobileNavHeight,
        mobileHeightTrue,
        mobileHeightFalse,
       
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
// make sure use
export const useNavContext = () => {
  return useContext(NavContext);
};

export { NavContext, NavProvider };