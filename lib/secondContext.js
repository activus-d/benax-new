import React, { useState, useContext } from 'react';
const SecondContext = React.createContext();

const SecondProvider = ({ children }) => {
  const [isTry, setIsTry] = useState(false);

  
  

  return (
    <SecondContext.Provider
      value={{
        isTry
       
      }}
    >
      {children}
    </SecondContext.Provider>
  );
};
// make sure use
export const useSecondContext = () => {
  return useContext(SecondContext);
};

export { SecondContext, SecondProvider };