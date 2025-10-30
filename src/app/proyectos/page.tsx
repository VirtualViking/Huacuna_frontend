"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/src/components/ui/Navbar";
import Breadcrumb from "@/src/components/ui/Breadcrumb";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Escuela de Música e Inglés",
      description: "Programas educativos especializados para desarrollar habilidades artísticas e idiomas.",
      image: "/projects/music-english.jpg",
      status: "En curso"
    },
    {
      title: "Talleres de Lectura y Desarrollo Emocional",
      description: 'Programa "Mi Mejor Versión" enfocado en animación a la lectura y desarrollo emocional de los niños.',
      image: "/projects/reading-workshop.jpg",
      status: "En curso"
    },
    {
      title: "Formación Técnica SENA",
      description: "Cursos y talleres en colaboración con el SENA para desarrollo de artes y oficios.",
      image: "/projects/technical-education.jpg",
      status: "En curso"
    }
  ];

  const upcomingEvents = [
    {
      title: "Taller de Emprendimiento",
      date: "15 de Noviembre, 2025",
      description: "Taller especial para madres y acudientes sobre habilidades emprendedoras.",
      image: "/events/entrepreneurship.jpg"
    },
    {
      title: "Jornada de Voluntariado",
      date: "20 de Noviembre, 2025",
      description: "Únete a nuestra jornada de refuerzo escolar y actividades artísticas.",
      image: "/events/volunteer-day.jpg"
    },
    {
      title: "Escuela de Música",
      date: "Todos los Sábados",
      description: "Clases de música para desarrollar talentos artísticos.",
      image: "/events/music-school.jpg"
    }
  ];

  const activities = [
    {
      title: "Refuerzo Escolar",
      description: "Apoyo académico personalizado para mejorar el rendimiento escolar.",
      image: "/activities/tutoring.jpg"
    },
    {
      title: "Actividades Recreativas",
      description: "Esparcimiento y desarrollo de habilidades sociales a través del juego.",
      image: "/activities/recreation.jpg"
    },
    {
      title: "Talleres Creativos",
      description: "Desarrollo de habilidades artísticas y expresión personal.",
      image: "/activities/creative-workshops.jpg"
    }
  ];

  const stats = [
    { value: 12, label: "Años de Experiencia" },
    { value: 2129, label: "Niños Beneficiados" },
    { value: 6, label: "Programas Activos" },
    { value: 8, label: "Alianzas Estratégicas" }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: "Proyectos" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Transformando Vidas a Través de Proyectos Comunitarios
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Para seguir expandiendo nuestro impacto y alcanzar a más niños, la Fundación Huahuacuna busca apoyo en diversas áreas. Cada contribución, grande o pequeña, es un paso vital hacia un futuro más brillante.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#1E3A5F]">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Proyectos */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Nuestros Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-[#1E3A5F]">{project.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{project.description}</p>
                <Link
                  href="#"
                  className="mt-4 inline-block text-[#FDD835] font-semibold text-sm hover:text-[#FBC02D]"
                >
                  Ver más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Participa en nuestros próximos eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#1E3A5F] mb-2">{event.title}</h3>
                  <p className="text-sm text-yellow-600 mb-2">{event.date}</p>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                  <Link
                    href="#"
                    className="mt-4 inline-block text-[#FDD835] font-semibold text-sm hover:text-[#FBC02D]"
                  >
                    Inscribirse →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actividades */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#1E3A5F] mb-8">Actividades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#1E3A5F] mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100/70">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">¿Quieres Apoyar un Proyecto?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a nosotros en nuestra misión de transformar vidas. Tu apoyo hace la diferencia en la educación y el futuro de nuestros niños.
          </p>
          <Link
            href="#"
            className="inline-block px-8 py-3 rounded-full bg-[#FDD835] text-[#1E3A5F] font-semibold hover:bg-[#FBC02D] transition-colors"
          >
            Contribuir Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}