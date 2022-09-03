import React, { useState, useContext } from 'react';
const AppContext = React.createContext();
import { studioPhotos } from './data'

const AppProvider = ({ children }) => {
  const [isMobileNavHeight, setIsMobileNavHeight] = useState(false);

  const mobileHeightTrue = () => {
    return setIsMobileNavHeight(true)
  };
  const mobileHeightFalse = () => {
    return setIsMobileNavHeight(false)
  };
  

  return (
    <AppContext.Provider
      value={{
        isMobileNavHeight,
        mobileHeightTrue,
        mobileHeightFalse,
        studioPhotos
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };