"use client";

import { useState, useCallback } from "react";
import { API_ENDPOINTS, fetchWithTimeout } from "../lib/api";
import type {
  IRegisterRequest,
  IRegisterResponse,
  IErrorResponse,
} from "../types/auth";

// Este hook ya no es necesario ya que la funcionalidad de registro está en useAuth
// Mantenido por compatibilidad temporal
export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (registerData: IRegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithTimeout(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as IErrorResponse;
        throw new Error(errorData.message || "Error en el registro");
      }

      const registerResponse = data as IRegisterResponse;

      if (registerResponse.success) {
        return registerResponse.user;
      } else {
        throw new Error(registerResponse.message || "Error desconocido");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error inesperado";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    register,
    isLoading,
    error,
    clearError,
  };
}