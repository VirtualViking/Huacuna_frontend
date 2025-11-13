// src/lib/services/eventService.ts

import { API_ENDPOINTS, fetchWithAuth } from "@/lib/api";
import { Event, EventRequest, EventFilters, ApiResponse } from "@/types/cms.types";

export const eventService = {
  /**
   * Obtiene todos los eventos con filtros opcionales
   */
  async getAll(filters?: EventFilters): Promise<Event[]> {
    let url = API_ENDPOINTS.CMS.EVENTS;
    
    if (filters?.filter) {
      url += `?filter=${filters.filter}`;
    }
    
    const response = await fetchWithAuth(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener eventos");
    }
    
    const data: ApiResponse<Event[]> = await response.json();
    return data.data || [];
  },

  /**
   * Obtiene un evento por ID
   */
  async getById(id: number): Promise<Event> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENT_BY_ID(id));
    
    if (!response.ok) {
      throw new Error("Evento no encontrado");
    }
    
    const data: ApiResponse<Event> = await response.json();
    
    if (!data.data) {
      throw new Error("Evento no encontrado");
    }
    
    return data.data;
  },

  /**
   * Crea un nuevo evento
   */
  async create(eventData: EventRequest): Promise<Event> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENTS, {
      method: "POST",
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear evento");
    }
    
    const data: ApiResponse<Event> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al crear evento");
    }
    
    return data.data;
  },

  /**
   * Actualiza un evento existente
   */
  async update(id: number, eventData: EventRequest): Promise<Event> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENT_BY_ID(id), {
      method: "PUT",
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al actualizar evento");
    }
    
    const data: ApiResponse<Event> = await response.json();
    
    if (!data.data) {
      throw new Error("Error al actualizar evento");
    }
    
    return data.data;
  },

  /**
   * Elimina un evento
   */
  async delete(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENT_BY_ID(id), {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al eliminar evento");
    }
  },

  /**
   * Activa un evento
   */
  async activate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENT_ACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al activar evento");
    }
  },

  /**
   * Desactiva un evento
   */
  async deactivate(id: number): Promise<void> {
    const response = await fetchWithAuth(API_ENDPOINTS.CMS.EVENT_DEACTIVATE(id), {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Error al desactivar evento");
    }
  },

  /**
   * Busca eventos por título
   */
  async search(title: string): Promise<Event[]> {
    const response = await fetchWithAuth(
      `${API_ENDPOINTS.CMS.EVENT_SEARCH}?title=${encodeURIComponent(title)}`
    );
    
    if (!response.ok) {
      throw new Error("Error en la búsqueda");
    }
    
    const data: ApiResponse<Event[]> = await response.json();
    return data.data || [];
  },
};