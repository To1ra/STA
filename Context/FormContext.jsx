import React, { createContext, useRef, useContext } from "react";

const RefContext = createContext(null);

export const RefProvider = ({ children }) => {
  const sharedRef = useRef({});
  return (
    <RefContext.Provider value={sharedRef}>{children}</RefContext.Provider>
  );
};

export const useSharedRef = () => useContext(RefContext);
