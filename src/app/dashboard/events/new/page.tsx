"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { eventService } from "@/lib/services/eventService";
import { EventRequest } from "@/types/cms.types";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

export default function EventFormPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id ? Number(params.id) : null;
  const isEditing = eventId !== null;

  const [formData, setFormData] = useState<EventRequest>({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    imageUrl: "",
    maxParticipants: undefined,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && eventId) {
      loadEvent();
    }
  }, [isEditing, eventId]);

  const loadEvent = async () => {
    if (!eventId) return;
    
    try {
      setIsLoading(true);
      const event = await eventService.getById(eventId);
      setFormData({
        title: event.title,
        description: event.description,
        eventDate: event.eventDate,
        location: event.location || "",
        imageUrl: event.imageUrl || "",
        maxParticipants: event.maxParticipants,
        isActive: event.isActive,
      });
    } catch (err: any) {
      setError(err.message || "Error al cargar el evento");
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

    if (!formData.eventDate) {
      setError("La fecha del evento es obligatoria");
      return;
    }

    try {
      setIsLoading(true);

      if (isEditing && eventId) {
        await eventService.update(eventId, formData);
      } else {
        await eventService.create(formData);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/events");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Error al guardar el evento");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" && value ? Number(value) :
        type === "checkbox" ? (e.target as HTMLInputElement).checked :
        value,
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
              {isEditing ? "Editar Evento" : "Crear Evento"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing
                ? "Actualiza la información del evento"
                : "Completa los datos del nuevo evento"}
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
              ¡Evento guardado exitosamente! Redirigiendo...
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
              placeholder="Ej: Taller de Arte para Niños"
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
              placeholder="Describe el evento..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha */}
            <div>
              <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-900 mb-2">
                Fecha del Evento *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
              />
            </div>

            {/* Máx. Participantes */}
            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-semibold text-gray-900 mb-2">
                Máximo de Participantes
              </label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants || ""}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
                placeholder="Dejar vacío para ilimitado"
              />
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
              placeholder="Ej: Salón Principal, Calle 123"
            />
          </div>

          {/* URL de Imagen */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-900 mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
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
            <label htmlFor="isActive" className="text-sm font-medium text-gray-900">
              Evento activo
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
                  {isEditing ? "Actualizar" : "Crear"} Evento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </CMSLayout>
  );
}