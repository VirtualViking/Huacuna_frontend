"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { childService } from "@/lib/services/childService";
import { AdoptionChildRequest, AdoptionStatus } from "@/types/cms.types";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

const ADOPTION_STATUSES: { value: AdoptionStatus; label: string }[] = [
  { value: "DISPONIBLE", label: "Disponible para Apadrinamiento" },
  { value: "EN_PROCESO", label: "En Proceso de Apadrinamiento" },
  { value: "APADRINADO", label: "Apadrinado" },
  { value: "NO_DISPONIBLE", label: "No Disponible" },
];

const GENDERS = ["Masculino", "Femenino", "Otro"];

export default function ChildFormPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params?.id ? Number(params.id) : null;
  const isEditing = childId !== null;

  const [formData, setFormData] = useState<AdoptionChildRequest>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    photoUrl: "",
    bio: "",
    specialNeeds: "",
    currentLocation: "",
    adoptionStatus: "DISPONIBLE",
    sponsorId: undefined,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && childId) {
      loadChild();
    }
  }, [isEditing, childId]);

  const loadChild = async () => {
    if (!childId) return;

    try {
      setIsLoading(true);
      const child = await childService.getById(childId);
      setFormData({
        firstName: child.firstName,
        lastName: child.lastName,
        birthDate: child.birthDate,
        gender: child.gender || "",
        photoUrl: child.photoUrl || "",
        bio: child.bio || "",
        specialNeeds: child.specialNeeds || "",
        currentLocation: child.currentLocation || "",
        adoptionStatus: child.adoptionStatus,
        sponsorId: child.sponsorId,
        isActive: child.isActive,
      });
    } catch (err: any) {
      setError(err.message || "Error al cargar el registro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validaciones
    if (!formData.firstName.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("El apellido es obligatorio");
      return;
    }

    if (!formData.birthDate) {
      setError("La fecha de nacimiento es obligatoria");
      return;
    }

    // Validar que la fecha no sea futura
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    if (birthDate > today) {
      setError("La fecha de nacimiento no puede ser futura");
      return;
    }

    // Validar edad mínima (0 años) y máxima (18 años)
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 0 || age > 18) {
      setError("La edad debe estar entre 0 y 18 años");
      return;
    }

    try {
      setIsLoading(true);

      if (isEditing && childId) {
        await childService.update(childId, formData);
      } else {
        await childService.create(formData);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/children");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Error al guardar el registro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" && value
          ? Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  // Calcular edad en tiempo real
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading && isEditing) {
    return (
      <CMSLayout>
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-[#FDD835] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? "Editar Registro" : "Registrar Niño"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información del niño"
                : "Completa los datos del nuevo registro"}
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 font-medium">
              ¡Registro guardado exitosamente! Redirigiendo...
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {/* Información Personal */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
              Información Personal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Nombre *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                  placeholder="Ej: Juan"
                />
              </div>

              {/* Apellido */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Apellido *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                  placeholder="Ej: Pérez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fecha de Nacimiento */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                />
                {formData.birthDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Edad: {calculateAge(formData.birthDate)} años
                  </p>
                )}
              </div>

              {/* Género */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Género
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                >
                  <option value="">Seleccionar género</option>
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ubicación Actual */}
            <div>
              <label
                htmlFor="currentLocation"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Ubicación Actual
              </label>
              <input
                type="text"
                id="currentLocation"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                placeholder="Ej: Hogar de Acogida - Calarcá"
              />
            </div>
          </div>

          {/* Biografía */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
              Biografía e Información Adicional
            </h2>

            {/* Biografía */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Biografía
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                placeholder="Describe un poco sobre el niño: su personalidad, intereses, sueños..."
              />
            </div>

            {/* Necesidades Especiales */}
            <div>
              <label
                htmlFor="specialNeeds"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Necesidades Especiales (Opcional)
              </label>
              <textarea
                id="specialNeeds"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                placeholder="Indica si tiene alguna necesidad especial: médica, educativa, etc."
              />
            </div>

            {/* URL de Foto */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                URL de la Foto
              </label>
              <input
                type="url"
                id="photoUrl"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                placeholder="https://ejemplo.com/foto.jpg"
              />
              {formData.photoUrl && (
                <div className="mt-3">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Estado de Adopción */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
              Estado de Apadrinamiento
            </h2>

            {/* Estado de Adopción */}
            <div>
              <label
                htmlFor="adoptionStatus"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Estado
              </label>
              <select
                id="adoptionStatus"
                name="adoptionStatus"
                value={formData.adoptionStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
              >
                {ADOPTION_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado Activo */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-[#FDD835] focus:ring-[#FDD835]"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-900"
              >
                Registro activo y visible en el sistema
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-[#FDD835] text-[#1E3A5F] rounded-lg font-semibold hover:bg-[#FBC02D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#1E3A5F] border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? "Actualizar" : "Registrar"} Niño
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </CMSLayout>
  );
}