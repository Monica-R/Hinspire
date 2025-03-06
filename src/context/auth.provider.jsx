// Definimos el estado y lo proveemos

import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }) => {
  // Este estado lo que obtendrá será el token
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));

  //Sincronizamos con localstorage
  //Para ello, usamos useEffect para crear un efecto secundario

  useEffect(() => {
    if(authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{authToken, setAuthToken}}>
      { children }
    </AuthContext.Provider>
  );
}