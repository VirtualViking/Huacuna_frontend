"use client";

import { useState, useCallback } from "react";
import { API_ENDPOINTS, fetchWithTimeout } from "../lib/api";
import type {
  ILoginRequest,
  ILoginResponse,
  IErrorResponse,
  IUserInfo,
} from "../types/auth";

/*
  useAuth - Hook de autenticación

  Propósito:
  - Centraliza la lógica de autenticación del frontend: login, register, logout,
    gestión de estado (user, token) y persistencia en sessionStorage.

  Responsabilidad:
  - Exponer una API simple: { user, token, isLoading, error, login, register, logout, clearError }
  - Manejar side-effects mínimos (guardar/leer de sessionStorage)

  Interacciones:
  - Usa `fetchWithTimeout` y `API_ENDPOINTS` desde `src/lib/api.ts` para comunicarse con el backend.
  - Consumido por `LoginForm`, `RegisterForm` y `Navbar` para mostrar estado del usuario.

  Notas y buenas prácticas:
  - Mantener este hook ligero: ninguna lógica de UI aquí.
  - En producción considerar tokens en cookies httpOnly y refresh tokens en lugar de sessionStorage.
  - Es una buena candidata a pruebas unitarias (mockear la capa fetch).
*/

export function useAuth() {
  const [user, setUser] = useState<IUserInfo | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = sessionStorage.getItem("auth_user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("auth_token");
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error("Por favor, completa todos los campos");
      }

      const payload: ILoginRequest = { email, password };

      const response = await fetchWithTimeout(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as IErrorResponse;
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const loginResponse = data as ILoginResponse;

      if (loginResponse.success) {
        setUser(loginResponse.user);
        setToken(loginResponse.token);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("auth_token", loginResponse.token);
          sessionStorage.setItem("auth_user", JSON.stringify(loginResponse.user));
        }
      } else {
        throw new Error(loginResponse.message || "Error desconocido");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error inesperado";
      setError(errorMessage);
      setUser(null);
      setToken(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);


  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_user");
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { user, token, isLoading, error, login, logout, clearError };
}