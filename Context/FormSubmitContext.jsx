import React, { createContext, useRef, useContext } from "react";
import { useSharedRef } from "./FormContext";

const submitContext = createContext(null);

export const SubmitProvider = ({ children }) => {
  const Ref = useSharedRef();
  const submitGeneral = (num, fieldName, update) => {
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

export const useSubmit = () => useContext(submitContext);
