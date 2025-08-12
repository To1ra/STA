import React, { createContext, useRef, useContext, ReactNode } from "react";
import { useSharedRef } from "./FormContext";

interface SubmitContextType {
  (num: any, fieldName: string, update: (value: any) => void): void;
}

const submitContext = createContext<SubmitContextType | null>(null);

interface SubmitProviderProps {
  children: ReactNode;
}

export const SubmitProvider: React.FC<SubmitProviderProps> = ({ children }) => {
  const Ref = useSharedRef();
  const submitGeneral = (num: any, fieldName: string, update: (value: any) => void) => {
    Ref.current[fieldName] = num;
    // console.log(`The field ${fieldName} is equal to ${num}`);
    update(num);
  };
  return (
    <submitContext.Provider value={submitGeneral}>
      {children}
    </submitContext.Provider>
  );
};

export const useSubmit = (): SubmitContextType => {
  const context = useContext(submitContext);
  if (!context) {
    throw new Error('useSubmit must be used within a SubmitProvider');
  }
  return context;
};
