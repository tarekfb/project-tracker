import { useState, createContext, useContext } from 'react';

const BlurContext = createContext(false);

export function BlurContextProvider({ children }) {
  const [blur, setBlur] = useState(false);

  const toggleBlur = (bool) => {
    setBlur(bool);
  };

  return <BlurContext.Provider value={{ blur, toggleBlur }}>{children}</BlurContext.Provider>;
}

export function useBlurContext() {
  return useContext(BlurContext);
}
