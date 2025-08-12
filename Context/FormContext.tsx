import React, { createContext, useRef, useContext, ReactNode } from "react";

interface SharedRefType {
  [key: string]: any;
}

const RefContext = createContext<React.RefObject<SharedRefType> | null>(null);

export const RefProvider = ({ children }: { children: ReactNode }) => {
  const sharedRef = useRef<SharedRefType>({});
  return (
    <RefContext.Provider value={sharedRef}>{children}</RefContext.Provider>
  );
};

export const useSharedRef = () => {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error("useSharedRef must be used within a RefProvider");
  }
  return context;
};
