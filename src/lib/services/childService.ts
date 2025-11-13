// src/lib/services/childService.ts

import { API_ENDPOINTS, fetchWithAuth } from "@/lib/api";
import { AdoptionChild, AdoptionChildRequest, ChildFilters, ApiResponse, AdoptionStatus } from "@/types/cms.types";

export const childService = {
  /**
   * Obtiene todos los niños con filtros opcionales
   */
  async getAll(filters?: ChildFilters): Promise<AdoptionChild[]> {
    let url = API_ENDPOINTS.CMS.CHILDREN;
    const params = new URLSearchParams();
    
    if (filters?.filter) params.append("filter", filters.filter);
    if (filters?.status) params.append("status", filters.status);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetchWithAuth(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener registros");
    }
    
    const data: ApiResponse<AdoptionChild[]> = await response.json();
    return data.data || [];
  },

  /**
   * Obtiene un niño por ID
   */
  async getById(id: number): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_BY_ID(id));
    
    if (!response.ok) {
      throw new Error("Registro no encontrado");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Registro no encontrado");
    }
    
    return data.data;
  },

  /**
   * Crea un nuevo registro de niño
   */
  async create(childData: AdoptionChildRequest): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILDREN, {
      method: "POST",
      body: JSON.stringify(childData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear registro");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al crear registro");
    }
    
    return data.data;
  },

  /**
   * Actualiza un registro existente
   */
  async update(id: number, childData: AdoptionChildRequest): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_BY_ID(id), {
      method: "PUT",
      body: JSON.stringify(childData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar registro");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar registro");
    }
    
    return data.data;
  },

  /**
   * Elimina un registro
   */
  async delete(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_BY_ID(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar registro");
    }
  },

  /**
   * Activa un registro
   */
  async activate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_ACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al activar registro");
    }
  },

  /**
   * Desactiva un registro
   */
  async deactivate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_DEACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al desactivar registro");
    }
  },

  /**
   * Asigna un padrino a un niño
   */
  async assignSponsor(id: number, sponsorId: number): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_ASSIGN_SPONSOR(id), {
      method: "POST",
      body: JSON.stringify({ sponsorId }),
    });
    
    if (!response.ok) {
      throw new Error("Error al asignar padrino");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al asignar padrino");
    }
    
    return data.data;
  },

  /**
   * Remueve el padrino de un niño
   */
  async removeSponsor(id: number): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_REMOVE_SPONSOR(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Error al remover padrino");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al remover padrino");
    }
    
    return data.data;
  },

  /**
   * Actualiza el estado de adopción
   */
  async updateStatus(id: number, status: AdoptionStatus): Promise<AdoptionChild> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.CHILD_UPDATE_STATUS(id), {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error("Error al actualizar estado");
    }
    
    const data: ApiResponse<AdoptionChild> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar estado");
    }
    
    return data.data;
  },

  /**
   * Busca niños por nombre
   */
  async search(name: string): Promise<AdoptionChild[]> {
    const response = await fetchWithAuth(
      `${API_ENDPOINTS.CMS.CHILD_SEARCH}?name=${encodeURIComponent(name)}`
    );
    
    if (!response.ok) {
      throw new Error("Error en la búsqueda");
    }
    
    const data: ApiResponse<AdoptionChild[]> = await response.json();
    return data.data || [];
  },
};