// context/RefContext.tsx
import React, { createContext, useRef, useContext, ReactNode } from "react";
import { ShiftData } from "../utils/types";

const RefContext = createContext<React.RefObject<ShiftData | null> | null>(
  null
);

export const ShiftRefProvider = ({ children }: { children: ReactNode }) => {
  const sharedRef = useRef<ShiftData | null>(null); // starts empty
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
