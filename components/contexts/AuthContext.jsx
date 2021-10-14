import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(false);

export function AuthContextProvider({ children }) {
  const [userState, setUser] = useState();

  const setUserWrapper = (user) => {
    setUser(user);
  };

  return <AuthContext.Provider value={{ userState, setUserWrapper }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
