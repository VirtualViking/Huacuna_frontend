"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { projectService } from "@/lib/services/projectService";
import { ProjectRequest, Project, ProjectStatus } from "@/types/cms.types";
import { ArrowLeft, Save, X } from "lucide-react";

// ✅ TU CÓDIGO ORIGINAL - MANTENIDO
const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: "PLANIFICACION", label: "En Planificación" },
  { value: "EN_PROGRESO", label: "En Progreso" },
  { value: "PAUSADO", label: "Pausado" },
  { value: "COMPLETADO", label: "Completado" },
  { value: "CANCELADO", label: "Cancelado" },
];

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id ? Number(params.id) : null;
  const isEditing = !!projectId;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // ✅ CORRECCIÓN 1: budget: 0 en lugar de undefined
  const [formData, setFormData] = useState<ProjectRequest>({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    status: "PLANIFICACION", // ✅ Tu valor por defecto
    imageUrl: "",
    budget: 0,              // ✅ CORREGIDO: era undefined
    fundsRaised: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [isLoadingData, setIsLoadingData] = useState(false);

  // ✅ CORRECCIÓN 2: Validación correcta de projectId
  useEffect(() => {
    if (isEditing && projectId) {
      loadProject();
    }
  }, [isEditing, projectId]); // ✅ Dependencias correctas

  const loadProject = async () => {
    if (!projectId) return; // ✅ Validación adicional
    
    setIsLoadingData(true);
    try {
      const project = await projectService.getById(projectId);
      
      // ✅ CORRECCIÓN 3: Mapeo correcto con valores por defecto
      setFormData({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription || "",
        category: project.category,
        status: project.status,
        imageUrl: project.imageUrl || "",
        budget: project.budget,
        fundsRaised: project.fundsRaised,
        startDate: project.startDate,
        endDate: project.endDate || "",
        isActive: project.isActive,
      });
    } catch (err: any) {
      setError(err.message || "Error al cargar el proyecto");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && projectId) {
        await projectService.update(projectId, formData);
        setSuccess("Proyecto actualizado exitosamente");
      } else {
        await projectService.create(formData);
        setSuccess("Proyecto creado exitosamente");
      }
      setTimeout(() => router.push("/dashboard/projects"), 1500);
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
      [name]: type === "number" ? (parseFloat(value) || 0) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  if (isLoadingData) {
    return (
      <CMSLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Cargando proyecto...</div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="Ej: Construcción de Casa Hogar"
            />
          </div>

          {/* Descripción Corta */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Corta *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="Descripción breve del proyecto..."
            />
          </div>

          {/* Descripción Larga */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Detallada
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription || ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="Descripción completa del proyecto..."
            />
          </div>

          {/* URL de Imagen */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de Imagen
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="Ej: Infraestructura, Educación"
            />
          </div>

          {/* Estado - ✅ TU LÓGICA ORIGINAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio *
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Fin
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Presupuesto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto (S/.) *
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="0.00"
            />
          </div>

          {/* Fondos Recaudados */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fondos Recaudados (S/.)
            </label>
            <input
              type="number"
              name="fundsRaised"
              value={formData.fundsRaised}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              placeholder="0.00"
            />
          </div>

          {/* Estado Activo */}
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Proyecto activo
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear Proyecto"}
          </button>
        </div>
      </form>
    </CMSLayout>
  );
}