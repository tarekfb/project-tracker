import { useState, createContext } from 'react';

//provider
export const SavingContext = createContext(false);

//hooks that components can use to change the values
export function useSavingContextValue() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaving = (bool) => {
    if (isSaving !== bool) {
      setIsSaving(bool);
    }
  };

  return {
    isSaving,
    setIsSaving,
    handleSaving,
  };
}
