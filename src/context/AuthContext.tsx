import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { auth } from "../config/firebase";

type AuthContextType = {
  user: User | null,
  login: (email: string, password: string) => void,
  logout: () => void,
};


const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<User>(null!);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser!);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
