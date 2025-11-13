// src/lib/services/projectService.ts

import { API_ENDPOINTS, fetchWithAuth } from "@/lib/api";
import { Project, ProjectRequest, ProjectFilters, ApiResponse, ProjectStatus } from "@/types/cms.types";

export const projectService = {
  /**
   * Obtiene todos los proyectos con filtros opcionales
   */
  async getAll(filters?: ProjectFilters): Promise<Project[]> {
    let url = API_ENDPOINTS.CMS.PROJECTS;
    const params = new URLSearchParams();
    
    if (filters?.filter) params.append("filter", filters.filter);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.category) params.append("category", filters.category);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetchWithAuth(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener proyectos");
    }
    
    const data: ApiResponse<Project[]> = await response.json();
    return data.data || [];
  },

  /**
   * Obtiene un proyecto por ID
   */
  async getById(id: number): Promise<Project> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_BY_ID(id));
    
    if (!response.ok) {
      throw new Error("Proyecto no encontrado");
    }
    
    const data: ApiResponse<Project> = await response.json();
    
    if (!data.data) {
      throw new Error("Proyecto no encontrado");
    }
    
    return data.data;
  },

  /**
   * Crea un nuevo proyecto
   */
  async create(projectData: ProjectRequest): Promise<Project> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECTS, {
      method: "POST",
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear proyecto");
    }
    
    const data: ApiResponse<Project> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al crear proyecto");
    }
    
    return data.data;
  },

  /**
   * Actualiza un proyecto existente
   */
  async update(id: number, projectData: ProjectRequest): Promise<Project> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_BY_ID(id), {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar proyecto");
    }
    
    const data: ApiResponse<Project> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar proyecto");
    }
    
    return data.data;
  },

  /**
   * Elimina un proyecto
   */
  async delete(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_BY_ID(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar proyecto");
    }
  },

  /**
   * Activa un proyecto
   */
  async activate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_ACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al activar proyecto");
    }
  },

  /**
   * Desactiva un proyecto
   */
  async deactivate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_DEACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al desactivar proyecto");
    }
  },

  /**
   * Actualiza los fondos recaudados
   */
  async updateFunds(id: number, amount: number): Promise<Project> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_UPDATE_FUNDS(id), {
      method: "PATCH",
      body: JSON.stringify({ amount }),
    });
    
    if (!response.ok) {
      throw new Error("Error al actualizar fondos");
    }
    
    const data: ApiResponse<Project> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar fondos");
    }
    
    return data.data;
  },

  /**
   * Actualiza el estado del proyecto
   */
  async updateStatus(id: number, status: ProjectStatus): Promise<Project> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.PROJECT_UPDATE_STATUS(id), {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error("Error al actualizar estado");
    }
    
    const data: ApiResponse<Project> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar estado");
    }
    
    return data.data;
  },

  /**
   * Busca proyectos por título
   */
  async search(title: string): Promise<Project[]> {
    const response = await fetchWithAuth(
      `${API_ENDPOINTS.CMS.PROJECT_SEARCH}?title=${encodeURIComponent(title)}`
    );
    
    if (!response.ok) {
      throw new Error("Error en la búsqueda");
    }
    
    const data: ApiResponse<Project[]> = await response.json();
    return data.data || [];
  },
};