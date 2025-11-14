"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { DataTable, Column } from "@/components/cms/DataTable";
import { useCMS } from "@/hooks/useCMS";
import { eventService } from "@/lib/services/eventService";
import { Event, EventRequest } from "@/types/cms.types";
import { Plus, Search, Filter, Calendar as CalendarIcon } from "lucide-react";

export default function EventsPage() {
  const router = useRouter();
  const {
    items: events,
    isLoading,
    error,
    fetchAll,
    remove,
    activate,
    deactivate,
  } = useCMS<Event, EventRequest>({ service: eventService });

  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "past">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadEvents();
  }, [filter]);

  const loadEvents = () => {
    if (filter === "all") {
      fetchAll();
    } else {
      fetchAll({ filter });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleToggleActive = async (event: Event) => {
    try {
      if (event.isActive) {
        await deactivate(event.id);
      } else {
        await activate(event.id);
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<Event>[] = [
    {
      key: "title",
      label: "Título",
      render: (event) => (
        <div>
          <p className="font-semibold">{event.title}</p>
          <p className="text-xs text-gray-500">{event.location || "Sin ubicación"}</p>
        </div>
      ),
    },
    {
      key: "eventDate",
      label: "Fecha del Evento",
      render: (event) => (
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span>{new Date(event.eventDate).toLocaleDateString("es-ES")}</span>
        </div>
      ),
    },
    {
      key: "currentParticipants",
      label: "Participantes",
      render: (event) => (
        <div>
          <span className="font-medium">{event.currentParticipants}</span>
          {event.maxParticipants && (
            <span className="text-gray-500"> / {event.maxParticipants}</span>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Estado",
      render: (event) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            event.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {event.isActive ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "isPastEvent",
      label: "Tipo",
      render: (event) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            event.isPastEvent
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {event.isPastEvent ? "Pasado" : "Próximo"}
        </span>
      ),
    },
  ];

  return (
    <CMSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
            <p className="text-gray-600 mt-1">
              Modulo para gestionar los eventos de la fundacion
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/events/new")}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FDD835] text-[#1E3A5F] rounded-lg font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Crear Evento
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835] text-gray-900"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#FDD835] text-[#1E3A5F]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === "active"
                  ? "bg-[#FDD835] text-[#1E3A5F]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === "upcoming"
                  ? "bg-[#FDD835] text-[#1E3A5F]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Próximos
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredEvents}
          onEdit={(event) => router.push(`/dashboard/events/${event.id}/edit`)}
          onDelete={(event) => setShowDeleteConfirm(event.id)}
          onToggleActive={handleToggleActive}
          isLoading={isLoading}
          emptyMessage="No se encontraron eventos"
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar evento?
              </h3>
              <p className="text-gray-600 mb-6">
                Esta acción no se puede deshacer. El evento será eliminado permanentemente.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 rounded-lg font-medium text-white hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CMSLayout>
  );
}