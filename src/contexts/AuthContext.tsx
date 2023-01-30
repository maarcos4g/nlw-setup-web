import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { auth } from "../services/firebase";
import { refreshToken } from "../utils/refreshToken";

interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string | null;
}

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const onSubscribe = auth.onAuthStateChanged(async user => {
    if (user) {
      const tokenResponse = await localStorage.getItem('@habitsTokenUser');
      let token = JSON.parse(tokenResponse!)
      console.log(token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userInfoResponse = await api.get('/me');

      setUser({
        id: userInfoResponse.data.user.sub,
        email: userInfoResponse.data.user.email,
        name: userInfoResponse.data.user.name,
        avatar: userInfoResponse.data.user.avatarUrl ?? "",
      })
    }
  })
  useEffect(() => {
    onSubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const response = await signInWithPopup(auth, provider);

    if (response.user) {
      const { uid, displayName, email, photoURL } = response.user;

      if (!displayName) {
        throw new Error("Missing information from Google Account")
      }

      try {
        const tokenResponse = await api.post('/users', {
          name: displayName,
          avatarUrl: photoURL,
          id: uid,
          email,
        });

        console.log(tokenResponse.data.token);
        localStorage.setItem("@habitsTokenUser", JSON.stringify({ token: tokenResponse.data.token }));

        api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

        const { data } = await api.get('/me');
        setUser({
          id: data.user.sub,
          email: data.user.email,
          name: data.user.name,
          avatar: data.user.avatarUrl ?? "",
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
      await refreshToken();

    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
