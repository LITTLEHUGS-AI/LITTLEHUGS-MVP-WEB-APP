// src/lib/WellnessContext.js
import React, { createContext, useContext, useState } from "react";

const WellnessContext = createContext();

export const WellnessProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openWellnessFlow = () => setIsOpen(true);
  const closeWellnessFlow = () => setIsOpen(false);

  return (
    <WellnessContext.Provider value={{ openWellnessFlow, closeWellnessFlow, isOpen }}>
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => useContext(WellnessContext);
