"use client";

import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/src/components/auth/LoginForm";

/*
  LoginPage (src/app/login/page.tsx)

  Propósito:
  - Presentar la pantalla de inicio de sesión en dos columnas (logo + formulario) en desktop,
    y una versión concentrada en mobile.

  Responsabilidad:
  - Componer la UI a partir de `LoginForm` y elementos visuales (logo, textos).
  - No manejar la lógica de autenticación directamente.

  Notas:
  - El formulario real está en `src/components/auth/LoginForm.tsx`.
*/
export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Poppins']">
      {/* COLUMNA IZQUIERDA - Logo y verso bíblico */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-[#FFFFFF]">
        <div className="max-w-md text-center space-y-10">
          {/* Logo grande */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Fundación Huahuacuna"
              width={1000}
              height={1000}
              className="w-auto h-auto max-w-[10000px]"
              priority
            />
          </div>
          
          {/* Verso bíblico */}
          <div className="space-y-4">
            <p className="text-[#1E3A5F] font-semibold text-[15px] leading-relaxed">
              Cualquiera que reciba en mi nombre a un niño<br />
              como este, a mí me recibe
            </p>
            <p className="text-[#1E3A5F] font-bold text-[17px] tracking-wide">
              Mateo 18:5
            </p>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA - Formulario */}
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 lg:px-12 py-12 bg-white min-h-screen shadow-2xl lg:rounded-xl">
        <div className="w-full max-w-[440px]">
          
          {/* Logo mobile */}
          <div className="lg:hidden mb-10 flex flex-col items-center gap-2">
            <Image
              src="/logo.png"
              alt="Fundación Huahuacuna"
              width={70}
              height={70}
              className="w-auto h-auto"
              priority
            />
            <p className="text-[#1E3A5F] text-xs font-medium tracking-wide">huahuacuna</p>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-[32px] lg:text-[36px] font-bold text-[#1E3A5F] mb-2 tracking-tight">
              Bienvenido de Vuelta
            </h1>
            <p className="text-[#6B7280] text-[14px] font-normal">
              Conectando corazones, transformando vidas
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-9 rounded-full overflow-hidden border-2 border-gray-200 bg-white h-[50px]">
            <button 
              type="button"
              className="w-full bg-[#FDD835] text-[#1E3A5F] font-semibold text-[14px] transition-all relative z-10 hover:bg-[#FBC02D]"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Formulario */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}