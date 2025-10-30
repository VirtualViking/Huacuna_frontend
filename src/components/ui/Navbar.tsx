"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";

/**
 * Navbar
 *
 * Componente de navegación superior. Muestra:
 * - Logo y enlaces principales
 * - Estado del usuario (nombre + botón cerrar sesión) cuando existe una sesión
 * - CTA para acciones importantes (Apadrinar Ahora)
 *
 * Interacciones:
 * - Consume `useAuth` para leer el usuario y ejecutar `logout`.
 * - Está pensado para ser ligero y centrado en presentar información.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-[30px] border border-gray-200/80 overflow-hidden shadow-lg bg-white">
          <div className="bg-gradient-to-r from-white via-yellow-50 to-yellow-300/70 px-6 py-2.5 rounded-[30px]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <Link href="/">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white rounded-full p-1 shadow-sm">
                      <Image src="/logo.png" alt="logo" width={36} height={36} className="rounded-full" />
                    </div>
                  </div>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/apadrinar" className="text-[#1E3A5F]/90 hover:text-[#1E3A5F] font-semibold text-sm">Apadrinar</Link>
                  <Link href="/impacto" className="text-[#1E3A5F]/90 hover:text-[#1E3A5F] font-semibold text-sm">Impacto</Link>
                  <Link href="/proyectos" className="text-[#1E3A5F]/90 hover:text-[#1E3A5F] font-semibold text-sm">Proyectos</Link>
                  <Link href="/voluntariado" className="text-[#1E3A5F]/90 hover:text-[#1E3A5F] font-semibold text-sm">Voluntariado</Link>
                  <Link href="/historias" className="text-[#1E3A5F]/90 hover:text-[#1E3A5F] font-semibold text-sm">Historias</Link>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="px-5 py-2 rounded-full bg-white text-[#1E3A5F] font-semibold text-sm shadow-sm">
                        {user.name}
                      </div>
                      <button 
                        onClick={logout}
                        className="px-4 py-2 rounded-full border border-gray-200 bg-white/90 text-[#1E3A5F]/90 text-sm font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white bg-white/90 text-[#1E3A5F] shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.78.64 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Iniciar Sesión
                  </Link>
                )}

                <Link 
                  href="#" 
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FDD835] text-[#1E3A5F] text-sm font-semibold shadow-sm hover:bg-[#F7C948] transition-colors"
                >
                  Apadrinar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
