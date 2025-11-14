"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { DataTable, Column } from "@/components/cms/DataTable";
import { useCMS } from "@/hooks/useCMS";
import { childService } from "@/lib/services/childService";
import { AdoptionChild, AdoptionChildRequest } from "@/types/cms.types";
import { Plus, Search, Heart, Calendar } from "lucide-react";

export default function ChildrenPage() {
  const router = useRouter();
  const {
    items: children,
    isLoading,
    error,
    fetchAll,
    remove,
    activate,
    deactivate,
  } = useCMS<AdoptionChild, AdoptionChildRequest>({ service: childService });

  const [filter, setFilter] = useState<"all" | "active" | "available">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadChildren();
  }, [filter]);

  const loadChildren = () => {
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

  const handleToggleActive = async (child: AdoptionChild) => {
    try {
      if (child.isActive) {
        await deactivate(child.id);
      } else {
        await activate(child.id);
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const filteredChildren = children.filter((child) =>
    child.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      DISPONIBLE: "bg-green-100 text-green-800",
      EN_PROCESO: "bg-blue-100 text-blue-800",
      APADRINADO: "bg-purple-100 text-purple-800",
      NO_DISPONIBLE: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const columns: Column<AdoptionChild>[] = [
    {
      key: "fullName",
      label: "Nombre Completo",
      render: (child) => (
        <div className="flex items-center gap-3">
          {child.photoUrl ? (
            <img
              src={child.photoUrl}
              alt={child.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
          )}
          <div>
            <p className="font-semibold">{child.fullName}</p>
            {child.gender && (
              <p className="text-xs text-gray-500">{child.gender}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "age",
      label: "Edad",
      render: (child) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{child.age} años</span>
        </div>
      ),
    },
    {
      key: "currentLocation",
      label: "Ubicación",
      render: (child) => (
        <span className="text-sm text-gray-600">
          {child.currentLocation || "No especificada"}
        </span>
      ),
    },
    {
      key: "adoptionStatus",
      label: "Estado de Adopción",
      render: (child) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            child.adoptionStatus
          )}`}
        >
          {child.adoptionStatusDisplayName}
        </span>
      ),
    },
    {
      key: "hasSponsor",
      label: "Padrino",
      render: (child) => (
        <div>
          {child.hasSponsor ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
              <Heart className="w-3 h-3" />
              Apadrinado
            </span>
          ) : (
            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
              Sin padrino
            </span>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Visibilidad",
      render: (child) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            child.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {child.isActive ? "Activo" : "Inactivo"}
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
            <h1 className="text-3xl font-bold text-gray-900">
              Niños en Apadrinamiento
            </h1>
            <p className="text-gray-600 mt-1">
              Modulo para el registro de niños 
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/children/new")}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FDD835] text-[#1E3A5F] rounded-lg font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Registrar Niño
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
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
              onClick={() => setFilter("available")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === "available"
                  ? "bg-[#FDD835] text-[#1E3A5F]"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Disponibles
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Total de Niños</p>
            <p className="text-2xl font-bold text-gray-900">
              {children.length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg border border-green-200 p-4">
            <p className="text-sm text-green-700 mb-1">Disponibles</p>
            <p className="text-2xl font-bold text-green-900">
              {children.filter((c) => c.adoptionStatus === "DISPONIBLE").length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
            <p className="text-sm text-purple-700 mb-1">Apadrinados</p>
            <p className="text-2xl font-bold text-purple-900">
              {children.filter((c) => c.hasSponsor).length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-sm text-blue-700 mb-1">En Proceso</p>
            <p className="text-2xl font-bold text-blue-900">
              {children.filter((c) => c.adoptionStatus === "EN_PROCESO").length}
            </p>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredChildren}
          onEdit={(child) =>
            router.push(`/dashboard/children/${child.id}/edit`)
          }
          onDelete={(child) => setShowDeleteConfirm(child.id)}
          onToggleActive={handleToggleActive}
          isLoading={isLoading}
          emptyMessage="No se encontraron registros de niños"
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar registro?
              </h3>
              <p className="text-gray-600 mb-6">
                Esta acción no se puede deshacer. El registro del niño será
                eliminado permanentemente del sistema.
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