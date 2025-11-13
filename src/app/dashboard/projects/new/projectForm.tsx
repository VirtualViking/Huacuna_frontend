"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { projectService } from "@/lib/services/projectService";
import { ProjectRequest, ProjectStatus } from "@/types/cms.types";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: "PLANIFICACION", label: "En Planificación" },
  { value: "EN_PROGRESO", label: "En Progreso" },
  { value: "PAUSADO", label: "Pausado" },
  { value: "COMPLETADO", label: "Completado" },
  { value: "CANCELADO", label: "Cancelado" },
];

const PROJECT_CATEGORIES = [
  "Educación",
  "Infraestructura",
  "Salud",
  "Alimentación",
  "Recreación",
  "Tecnología",
  "Otro",
];

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id ? Number(params.id) : null;
  const isEditing = projectId !== null;

  const [formData, setFormData] = useState<ProjectRequest>({
    title: "",
    description: "",
    category: "",
    status: "PLANIFICACION",
    imageUrl: "",
    budget: undefined,
    fundsRaised: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && projectId) {
      loadProject();
    }
  }, [isEditing, projectId]);

  const loadProject = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      const project = await projectService.getById(projectId);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category || "",
        status: project.status,
        imageUrl: project.imageUrl || "",
        budget: project.budget,
        fundsRaised: project.fundsRaised,
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        isActive: project.isActive,
      });
    } catch (err: any) {
      setError(err.message || "Error al cargar el proyecto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!formData.description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    try {
      setIsLoading(true);

      if (isEditing && projectId) {
        await projectService.update(projectId, formData);
      } else {
        await projectService.create(formData);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/projects");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Error al guardar el proyecto");
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
              {isEditing ? "Editar Proyecto" : "Crear Proyecto"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información del proyecto"
                : "Completa los datos del nuevo proyecto"}
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
              ¡Proyecto guardado exitosamente! Redirigiendo...
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              placeholder="Ej: Construcción de Biblioteca"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              placeholder="Describe el proyecto en detalle..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoría */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              >
                <option value="">Seleccionar categoría</option>
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              >
                {PROJECT_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Presupuesto */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Presupuesto ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget || ""}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
                placeholder="0.00"
              />
            </div>

            {/* Fondos Recaudados */}
            <div>
              <label
                htmlFor="fundsRaised"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Fondos Recaudados ($)
              </label>
              <input
                type="number"
                id="fundsRaised"
                name="fundsRaised"
                value={formData.fundsRaised || ""}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha de Inicio */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              />
            </div>

            {/* Fecha de Fin */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Fecha de Fin
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              />
            </div>
          </div>

          {/* URL de Imagen */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
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
              Proyecto activo y visible
            </label>
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
                  {isEditing ? "Actualizar" : "Crear"} Proyecto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </CMSLayout>
  );
}