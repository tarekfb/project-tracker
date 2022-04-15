import { useState, createContext, useContext } from "react";

const SavingContext = createContext(false);

export function SavingContextProvider({ children }) {
  const [isSaving, setIsSaving] = useState(false);

  const toggleIsSaving = () => {
    setIsSaving((prevState) => !prevState);
  };

  return (
    <SavingContext.Provider value={{ isSaving, toggleIsSaving }}>
      {children}
    </SavingContext.Provider>
  );
}

export function useSavingContext() {
  return useContext(SavingContext);
}
