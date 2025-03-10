// Definimos el estado y lo proveemos

import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { verify } from '../services/auth';

export const AuthProvider = ({ children }) => {
  // Este estado lo que obtendrá será el token
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null); // guardará los datos del usuario

  //Sincronizamos con localstorage
  //Para ello, usamos useEffect para crear un efecto secundario

  useEffect(() => {
    const verifying = async (token) => {
      try {
        const authenticatedData = await verify(token);
        setUser(authenticatedData);
      } catch (error) {
        setAuthToken(null);
        setUser(null);
        console.error("No pudimos comprobar su identidad.", error);
      }
    }

    if(authToken) {
      localStorage.setItem("authToken", authToken);
      verifying(authToken);
    } else {
      localStorage.removeItem("authToken");
      setUser(null);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{authToken, setAuthToken, user}}>
      { children }
    </AuthContext.Provider>
  );
}