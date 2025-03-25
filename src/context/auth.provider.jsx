// Definimos el estado y lo proveemos

import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { verify } from '../services/auth';
import { ClipLoader } from "react-spinners";

export const AuthProvider = ({ children }) => {
  // Este estado lo que obtendrá será el token
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null); // guardará los datos del usuario
  const [isLoading, setIsLoading] = useState(false);

  //Sincronizamos con localstorage
  //Para ello, usamos useEffect para crear un efecto secundario

  useEffect(() => {
    const verifying = async (token) => {
      try {
        setIsLoading(true);
        const authenticatedData = await verify(token);
        setUser(authenticatedData);
      } catch (error) {
        setAuthToken(null);
        setUser(null);
        console.error("No pudimos comprobar su identidad.", error);
      } finally {
        setIsLoading(false);
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

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
  }

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);


  return (
    <AuthContext.Provider value={{authToken, setAuthToken, user, isLoading, startLoading, stopLoading, logout}}>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color='#36d7b7' size={100}/>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}