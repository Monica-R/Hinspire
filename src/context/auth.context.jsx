import { createContext, useContext } from "react";

// Creamos un contexto
export const AuthContext = createContext();

// Usamos un hook para usar el contexto
export const useAuth = () => useContext(AuthContext);