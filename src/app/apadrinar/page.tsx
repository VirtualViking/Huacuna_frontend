"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ApadrinarPage() {
  const benefits = [
    {
      title: "Educación Integral",
      description: "Apoyo en educación formal, útiles escolares y actividades extracurriculares.",
      icon: "📚"
    },
    {
      title: "Salud y Bienestar",
      description: "Atención médica, complementos alimenticios y seguimiento nutricional.",
      icon: "🏥"
    },
    {
      title: "Desarrollo Personal",
      description: "Talleres de habilidades, actividades recreativas y apoyo emocional.",
      icon: "🌟"
    },
    {
      title: "Apoyo Familiar",
      description: "Orientación a padres y talleres para el desarrollo familiar.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Recursos Materiales",
      description: "Provisión de uniformes, calzado y materiales necesarios.",
      icon: "🎒"
    },
    {
      title: "Seguimiento Continuo",
      description: "Monitoreo del progreso y comunicación regular con padrinos.",
      icon: "📋"
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Breadcrumb items={[{ label: "Apadrinar" }]} />

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
            Conviértete en Padrino o Madrina
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tu apadrinamiento hace posible que niños en situación vulnerable reciban educación, 
            alimentación y apoyo integral para su desarrollo.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8 text-center">
            Beneficios de ser Padrino
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-[#1E3A5F] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formulario de Inscripción */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
              Formulario de Inscripción
            </h2>
            <form className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#1E3A5F]">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombres
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#1E3A5F]">Tipo de Apadrinamiento</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="tipo" className="text-[#FDD835] focus:ring-[#FDD835]" />
                    <span>Apadrinamiento Individual ($100.000 mensual)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="tipo" className="text-[#FDD835] focus:ring-[#FDD835]" />
                    <span>Apadrinamiento Compartido ($50.000 mensual)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2">
                  <input 
                    type="checkbox"
                    className="mt-1 text-[#FDD835] focus:ring-[#FDD835]"
                  />
                  <span className="text-sm text-gray-600">
                    Acepto recibir información sobre el progreso del niño apadrinado y las actividades 
                    de la fundación
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#FDD835] text-[#1E3A5F] font-semibold rounded-lg hover:bg-[#FBC02D] transition-colors"
              >
                Comenzar Apadrinamiento
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-[#1E3A5F] mb-4">Preguntas Frecuentes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#1E3A5F] mb-2">¿Cómo funciona el apadrinamiento?</h4>
                  <p className="text-sm text-gray-600">
                    El apadrinamiento es un compromiso mensual que permite brindar apoyo integral a un niño. 
                    Recibirás actualizaciones regulares sobre su progreso.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[#1E3A5F] mb-2">¿Puedo conocer al niño que apadrino?</h4>
                  <p className="text-sm text-gray-600">
                    Sí, organizamos encuentros periódicos donde los padrinos pueden conocer a los niños y 
                    participar en actividades especiales.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[#1E3A5F] mb-2">¿Por cuánto tiempo es el compromiso?</h4>
                  <p className="text-sm text-gray-600">
                    Sugerimos un compromiso mínimo de un año para garantizar la continuidad del apoyo, 
                    pero puedes renovar o ajustar tu aporte según tus posibilidades.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/70 p-6 rounded-xl">
              <h3 className="font-semibold text-[#1E3A5F] mb-4">¿Necesitas más información?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estamos aquí para resolver todas tus dudas sobre el proceso de apadrinamiento.
              </p>
              <Link
                href="/contacto"
                className="inline-block px-6 py-2 bg-white text-[#1E3A5F] rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}