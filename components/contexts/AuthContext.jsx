import { createContext, useContext } from 'react';
import { auth } from '@/firebase/FirebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
