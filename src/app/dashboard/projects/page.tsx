"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CMSLayout } from "@/components/cms/CMSLayout";
import { DataTable, Column } from "@/components/cms/DataTable";
import { useCMS } from "@/hooks/useCMS";
import { projectService } from "@/lib/services/projectService";
import { Project, ProjectRequest } from "@/types/cms.types";
import { Plus, Search, DollarSign } from "lucide-react";

export default function ProjectsPage() {
  const router = useRouter();
  const {
    items: projects,
    isLoading,
    error,
    fetchAll,
    remove,
    activate,
    deactivate,
  } = useCMS<Project, ProjectRequest>({ service: projectService });

  const [filter, setFilter] = useState<"all" | "active">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, [filter]);

  const loadProjects = () => {
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

  const handleToggleActive = async (project: Project) => {
    try {
      if (project.isActive) {
        await deactivate(project.id);
      } else {
        await activate(project.id);
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PLANIFICACION: "bg-gray-100 text-gray-800",
      EN_PROGRESO: "bg-blue-100 text-blue-800",
      PAUSADO: "bg-yellow-100 text-yellow-800",
      COMPLETADO: "bg-green-100 text-green-800",
      CANCELADO: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const columns: Column<Project>[] = [
    {
      key: "title",
      label: "Título",
      render: (project) => (
        <div>
          <p className="font-semibold">{project.title}</p>
          {project.category && (
            <p className="text-xs text-gray-500">{project.category}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (project) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            project.status
          )}`}
        >
          {project.statusDisplayName}
        </span>
      ),
    },
    {
      key: "fundingPercentage",
      label: "Financiamiento",
      render: (project) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="font-medium">
              {project.fundingPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(project.fundingPercentage, 100)}%` }}
            />
          </div>
          {project.budget && (
            <p className="text-xs text-gray-500">
              ${project.fundsRaised.toLocaleString()} / $
              {project.budget.toLocaleString()}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Visibilidad",
      render: (project) => (
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
            project.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {project.isActive ? "Activo" : "Inactivo"}
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
            <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
            <p className="text-gray-600 mt-1">
              Gestiona los proyectos de la fundación
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/projects/new")}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FDD835] text-[#1E3A5F] rounded-lg font-semibold hover:bg-[#FBC02D] transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Crear Proyecto
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDD835] focus:border-[#FDD835]"
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
          data={filteredProjects}
          onEdit={(project) =>
            router.push(`/dashboard/projects/${project.id}/edit`)
          }
          onDelete={(project) => setShowDeleteConfirm(project.id)}
          onToggleActive={handleToggleActive}
          isLoading={isLoading}
          emptyMessage="No se encontraron proyectos"
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar proyecto?
              </h3>
              <p className="text-gray-600 mb-6">
                Esta acción no se puede deshacer. El proyecto será eliminado
                permanentemente.
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