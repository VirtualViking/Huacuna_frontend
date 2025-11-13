"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

/*
  DashboardPage

  Propósito:
  - Página principal del área autenticada / landing del usuario.
  - Muestra la composición de varios componentes: `Navbar`, hero, cards y footer.

  Responsabilidad:
  - Componer la interfaz a partir de componentes pequeños y mantener la página lo más declarativa posible.
  - No contiene lógica de autenticación; esa responsabilidad la tiene `useAuth` y `Navbar`.

  Buenas prácticas:
  - Mantener las páginas enfocadas en composición visual y extraer bloques reutilizables cuando crezcan.
*/
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero left */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] leading-tight">
              Conectando Corazones,
              <br />
              Transformando Vidas
            </h1>
            <p className="text-[#6B7280]">
              Apadrina un niño y sé parte del cambio. Brindamos apoyo integral en educación, salud, nutrición y bienestar a niños en edad escolar.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <Link href="/apadrinar" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FDD835] text-[#1E3A5F] font-semibold shadow-sm">
                Apadrinar un niño
              </Link>
              <Link href="/donaciones" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-[#1E3A5F]">
                Hacer una Donación
              </Link>
            </div>
          </div>

          {/* Hero right (image card) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <Image src="/Home.jpg" alt="Niños" width={420} height={300} className="rounded-xl shadow-lg object-cover w-full h-auto" />
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md flex items-center gap-3">
                <Image src="/logo.png" alt="logo" width={36} height={36} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-[#1E3A5F]">Fundación</p>
                  <p className="text-xs text-gray-500">Huahuacuna</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards section */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Apadrinamiento</h3>
            <p className="text-sm text-gray-500">Conoce cómo apadrinar y transformar una vida.</p>
            <Link href="/apadrinarr" className="mt-4 inline-block text-sm text-[#FDD835] font-semibold">Apadrinar ahora</Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Voluntariado</h3>
            <p className="text-sm text-gray-500">Únete como voluntario y apoya proyectos locales.</p>
            <Link href="/voluntariado" className="mt-4 inline-block text-sm text-[#FDD835] font-semibold">Ser voluntario</Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Proyectos</h3>
            <p className="text-sm text-gray-500">Descubre nuestros proyectos en curso y sus impactos.</p>
            <Link href="/proyectos" className="mt-4 inline-block text-sm text-[#FDD835] font-semibold">Ver proyectos</Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <h3 className="font-semibold text-[#1E3A5F] mb-2">Donaciones</h3>
            <p className="text-sm text-gray-500">Aporta recursos para el bienestar de los niños.</p>
            <Link href="/donaciones" className="mt-4 inline-block text-sm text-[#FDD835] font-semibold">Donar ahora</Link>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">Nuestra Misión y Visión: Un Compromiso con el Futuro</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Apoyar a la niñez vulnerable mediante apadrinamientos y ayudas ocasionales para mejorar su calidad de vida a través de procesos educativos que incluyan a la familia. Esto es posible gracias a la colaboración económica y de voluntariado de personas y entidades nacionales y extranjeras.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser una institución que gestione permanentemente recursos para aumentar el número de niños beneficiados y programas que respondan a necesidades concretas. Contaremos con un grupo interdisciplinario para lograr familias cohesionadas, pacíficas y autogestionadoras, formando ciudadanos responsables y propositivos.
              </p>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Nuestra Historia: Un Viaje de Solidaridad y Crecimiento</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  La Fundación Huahuacuna inició su labor social en junio de 2003 como "Semilla italiana" gracias a la visión y liderazgo de Vargas Mayra Alejandra López Osorio y Lina María Guapacha, con el apoyo del Padre Agostino Abate, esta iniciativa floreció.
                </p>
                <p className="text-gray-600">
                  El 31 de mayo de 2004, se constituyó legalmente como Fundación Huahuacuna. Con la adhesión de Ángela Patricia Menza Astudillo y María Clarena Castaño Bedoya, nuestra alcance se expandió, beneficiando a más de 140 niños apadrinados por Cáritas de Acqui Terme, Italia, y dos por padrinos de Armenia.
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-3">Nuestro Programa</h3>
                <p className="text-gray-600">
                  Nos centramos en el apadrinamiento de niños en edad escolar, brindándoles apoyo integral en:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Educación formal y no formal</li>
                  <li>Salud y nutrición</li>
                  <li>Vestido y calzado</li>
                  <li>Complementos alimenticios</li>
                  <li>Actividades de esparcimiento</li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="/Historia.jpg" 
                alt="Actividades del programa" 
                width={500} 
                height={400} 
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#FDD835]/10 to-[#FDD835]/30 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-[#1E3A5F]">Sé Parte del Cambio Hoy</h3>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Apoya a niños en situación de vulnerabilidad con un aporte que transforma vidas. Tu contribución hace la diferencia en su educación, salud y bienestar.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="#" className="px-8 py-3 rounded-full bg-[#FDD835] text-[#1E3A5F] font-semibold hover:bg-[#FBC02D] transition-colors">
              Apadrinar un niño
            </Link>
            <Link href="#" className="px-8 py-3 rounded-full border border-gray-200 text-[#1E3A5F] hover:bg-gray-50 transition-colors">
              Hacer una Donación
            </Link>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="mt-12 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={48} height={48} />
            <div>
              <p className="font-semibold text-[#1E3A5F]">Fundación Huahuacuna</p>
              <p className="text-sm text-gray-500">Conectando corazones, transformando vidas</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Fundación Huahuacuna. Todos los derechos reservados.</div>
        </div>
      </footer>
    </main>
  );
}