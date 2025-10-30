"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/src/components/ui/Navbar";
import Breadcrumb from "@/src/components/ui/Breadcrumb";
import { CheckIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function DonacionesPage() {
  const [donationType, setDonationType] = useState<'monetaria' | 'especie'>('monetaria');

  const projectsList = [
    {
      name: "Programa de alimentación",
      amount: "25.000"
    },
    {
      name: "Educación y útiles escolares",
      amount: "45.000"
    },
    {
      name: "Construcción de viviendas",
      amount: "100.000"
    },
    {
      name: "Apoyo médico y salud",
      amount: "35.000"
    },
    {
      name: "Desarrollo comunitario",
      amount: "50.000"
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] font-['Poppins']">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Breadcrumb items={[{ label: "Donaciones" }]} />

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">
            Tu donación transforma vidas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Puedes realizar una donación monetaria de forma segura o aportar bienes y servicios para apoyar a nuestros programas.
          </p>
        </section>

        {/* Donation Type Selector */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-1 inline-flex w-full max-w-md mx-auto">
            <button
              onClick={() => setDonationType('monetaria')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                donationType === 'monetaria'
                  ? 'bg-[#FDD835] text-[#1E3A5F]'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50'
              }`}
            >
              Donación monetaria
            </button>
            <button
              onClick={() => setDonationType('especie')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                donationType === 'especie'
                  ? 'bg-[#FDD835] text-[#1E3A5F]'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50'
              }`}
            >
              Donación en especie
            </button>
          </div>
        </section>

        {donationType === 'monetaria' ? (
          <>
            {/* Monetary Donation Form */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-[#1E3A5F] mb-6">Formulario de Donación</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monto a donar (COP)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                      placeholder="25000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
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

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#FDD835] text-[#1E3A5F] font-semibold rounded-lg hover:bg-[#FBC02D] transition-colors"
                  >
                    Realizar Donación
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1E3A5F] mb-4">¿A qué apoya tu contribución económica?</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Alimentación diaria, útiles y uniformes para niños
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Apoyo en educación y desarrollo personal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Mantenimiento de instalaciones y programas
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1E3A5F] mb-4">Proyectos Financiados</h3>
                  <div className="space-y-3">
                    {projectsList.map((project, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{project.name}</span>
                        <span className="font-semibold text-[#1E3A5F]">$ {project.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* In-kind Donation Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-[#1E3A5F] mb-6">Donación en Especie</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de donación
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent">
                      <option value="">Selecciona el tipo de donación</option>
                      <option value="alimentos">Alimentos</option>
                      <option value="ropa">Ropa y Calzado</option>
                      <option value="utiles">Útiles Escolares</option>
                      <option value="juguetes">Juguetes</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción de los artículos
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                      placeholder="Describe los artículos que deseas donar..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#FDD835] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
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

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#FDD835] text-[#1E3A5F] font-semibold rounded-lg hover:bg-[#FBC02D] transition-colors"
                  >
                    Enviar Formulario
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1E3A5F] mb-4">¿Qué puedes donar?</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Alimentos no perecederos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Ropa y calzado en buen estado
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Útiles escolares y material educativo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      Juguetes y material didáctico
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/70 p-6 rounded-xl">
                  <h3 className="font-semibold text-[#1E3A5F] mb-4">Proceso de Donación</h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#1E3A5F]">1.</span>
                      Completa el formulario con los detalles de tu donación
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#1E3A5F]">2.</span>
                      Nuestro equipo te contactará para coordinar la recepción
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-[#1E3A5F]">3.</span>
                      Recibirás un comprobante de tu donación
                    </li>
                  </ol>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Contact Section */}
        <section className="bg-white p-8 rounded-xl shadow-sm text-center mb-12">
          <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4">Contáctanos</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-5 h-5 text-[#FDD835]" />
              <span className="text-gray-600">info@huahuacuna.org</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-[#FDD835]" />
              <span className="text-gray-600">123-456-7890</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-[#FDD835]" />
              <span className="text-gray-600">Calle 123 #45-67, Armenia, Quindío</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}