
"use client"; // ¡MUY IMPORTANTE! Esto debe ser un Client Component

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";
import { authService } from "@/lib/apiService"; // Importamos nuestro servicio
import { jwtDecode } from "jwt-decode"; // Necesitamos esta librería

// Instala jwt-decode: npm install jwt-decode

// 1. Definimos la forma del Token decodificado
interface DecodedToken {
  sub: string; // El 'subject' (email del usuario)
  iat: number;
  exp: number;
}

// 2. Definimos la forma de nuestro Usuario
interface AuthUser {
  email: string;
}

// 3. Definimos la forma del Contexto
interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // (Aquí podríamos añadir la función de registro si queremos)
}

// 4. Creamos el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 5. Creamos el Proveedor (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Para saber si estamos cargando la sesión

  // 6. Efecto para cargar el token desde localStorage al iniciar la app
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        const decodedToken: DecodedToken = jwtDecode(storedToken);
        
        // Verificamos si el token ha expirado
        if (decodedToken.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser({ email: decodedToken.sub });
        } else {
          // Token expirado
          localStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      console.error("Error al cargar el token:", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 7. Función de Login
  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const { accessToken } = response.data; // { "accessToken": "..." }

      // Decodificamos el token para obtener la info del usuario
      const decodedToken: DecodedToken = jwtDecode(accessToken);

      // Guardamos todo
      localStorage.setItem("authToken", accessToken);
      setToken(accessToken);
      setUser({ email: decodedToken.sub });

    } catch (error) {
      console.error("Error en el login:", error);
      // Lanzamos el error para que el formulario de login lo pueda mostrar
      throw new Error("Email o contraseña incorrectos");
    }
  };

  // 8. Función de Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  // 9. Exponemos el valor del contexto
  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 10. Creamos un Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};