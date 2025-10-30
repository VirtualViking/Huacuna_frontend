"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

/**
 * LoginForm
 *
 * Componente responsable de presentar el formulario de inicio de sesión,
 * validar campos básicos en el cliente y delegar la acción de autenticación
 * al hook `useAuth`.
 *
 * Responsabilidades:
 * - Mostrar inputs y validaciones rápidas (email regex, campos obligatorios)
 * - Mostrar estado de carga, errores y mensajes de éxito
 * - Redirigir al dashboard después de un inicio de sesión exitoso
 *
 * No debe:
 * - Contener lógica de negocio del backend (eso lo maneja `useAuth`)
 */
export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setLocalError("Por favor, ingresa tu correo");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Correo electrónico inválido");
      return false;
    }
    if (!password.trim()) {
      setLocalError("Por favor, ingresa tu contraseña");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    try {
      await login(email, password);
      setSuccessMessage("¡Inicio de sesión exitoso!");
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) {
      setLocalError(error || "Error en la autenticación");
    }
  };

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {displayError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{displayError}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm text-green-800 font-medium">{successMessage}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-[14px] font-semibold text-[#1F2937] mb-2.5">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (displayError) {
                setLocalError(null);
                clearError();
              }
            }}
            disabled={isLoading}
            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-[14px] text-[#1F2937] placeholder:text-gray-400 font-normal transition-all"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label htmlFor="password" className="block text-[14px] font-semibold text-[#1F2937]">
            Contraseña
          </label>
          <Link 
            href="/recuperar" 
            className="text-[13px] text-[#FDD835] hover:text-[#FBC02D] font-semibold transition-colors"
          >
            ¿Olvidaste?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (displayError) {
                setLocalError(null);
                clearError();
              }
            }}
            disabled={isLoading}
            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-[14px] text-[#1F2937] placeholder:text-gray-400 font-normal transition-all"
            placeholder="****"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5 pt-1">
        <input
          id="remember"
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          disabled={isLoading}
          className="w-[18px] h-[18px] rounded border-2 border-gray-300 text-[#FDD835] focus:ring-[#FDD835] focus:ring-2 cursor-pointer accent-[#FDD835]"
        />
        <label htmlFor="remember" className="text-[13px] text-[#4B5563] cursor-pointer select-none font-normal">
          Recordarme en este dispositivo
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 rounded-full bg-[#FDD835] text-[#1E3A5F] font-semibold text-[15px] hover:bg-[#FBC02D] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-6"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-[#1E3A5F] border-t-transparent rounded-full animate-spin"></span>
            Iniciando...
          </span>
        ) : (
          "Iniciar Sesión"
        )}
      </button>
    </form>
  );
}