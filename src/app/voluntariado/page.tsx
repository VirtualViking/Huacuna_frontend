"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function VoluntariadoPage() {
  const opportunities = [
    {
      title: "Tutor Educativo",
      description: "Brinda refuerzo escolar y apoyo académico personalizado a nuestros niños.",
      icon: "📚",
      commitment: "4 horas semanales",
      type: "Presencial",
    },
    {
      title: "Instructor de Arte",
      description: "Dirige talleres creativos y actividades artísticas para desarrollar habilidades expresivas.",
      icon: "🎨",
      commitment: "2 horas semanales",
      type: "Presencial",
    },
    {
      title: "Apoyo en Eventos",
      description: "Colabora en la organización y ejecución de eventos especiales y actividades recreativas.",
      icon: "🎉",
      commitment: "Según evento",
      type: "Presencial",
    },
    {
      title: "Mentor Digital",
      description: "Enseña habilidades tecnológicas y apoya en proyectos digitales de manera remota.",
      icon: "💻",
      commitment: "3 horas semanales",
      type: "Virtual",
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Breadcrumb items={[{ label: "Voluntariado" }]} />

        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
                Sé Parte del Cambio como Voluntario
              </h1>
              <p className="text-gray-600 mb-8">
                Tu tiempo y habilidades pueden hacer una diferencia real en la vida de nuestros niños. 
                Únete a nuestro programa de voluntariado y contribuye a crear un futuro mejor.
              </p>
              <Link
                href="#inscription-form"
                className="inline-block px-8 py-3 bg-[#FDD835] text-[#1E3A5F] font-semibold rounded-lg hover:bg-[#FBC02D] transition-colors"
              >
                Postularme como Voluntario
              </Link>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Voluntariado.jpg"
                alt="Voluntarios en acción"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">
            Oportunidades de Voluntariado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{opportunity.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[#1E3A5F] mb-2">{opportunity.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{opportunity.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {opportunity.commitment}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                        {opportunity.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section id="inscription-form" className="mb-16 scroll-mt-24">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
              Formulario de Inscripción
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombres y Apellidos
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                  />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Área de Interés
                  </label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                  >
                    <option value="">Selecciona un área</option>
                    <option value="educacion">Apoyo Educativo</option>
                    <option value="arte">Arte y Cultura</option>
                    <option value="eventos">Eventos</option>
                    <option value="digital">Apoyo Digital</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilidad Horaria
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    placeholder="Describe tu disponibilidad de horarios..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experiencia Previa
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    placeholder="Cuéntanos sobre tu experiencia en voluntariado o áreas relacionadas..."
                  ></textarea>
                </div>

                <div>
                  <label className="flex items-start gap-2">
                    <input 
                      type="checkbox"
                      className="mt-1 text-[#FDD835] focus:ring-[#FDD835]"
                    />
                    <span className="text-sm text-gray-600">
                      Acepto recibir información sobre oportunidades de voluntariado y actividades 
                      de la fundación
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#FDD835] text-[#1E3A5F] font-semibold rounded-lg hover:bg-[#FBC02D] transition-colors"
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Additional Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/70 p-6 rounded-xl">
            <h3 className="font-semibold text-[#1E3A5F] mb-4">¿Tienes dudas?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Contáctanos para resolver todas tus preguntas sobre el programa de voluntariado.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-6 py-2 bg-white text-[#1E3A5F] rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition-colors"
            >
              Contactar
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F] mb-4">Proceso de Selección</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>1. Envío de postulación</li>
              <li>2. Revisión de perfil</li>
              <li>3. Entrevista virtual</li>
              <li>4. Inducción y capacitación</li>
              <li>5. Inicio de actividades</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}