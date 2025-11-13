// src/types/cms.types.ts

// ============================================
// EVENTOS
// ============================================
export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  imageUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hasAvailableSpots: boolean;
  isPastEvent: boolean;
}

export interface EventRequest {
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  imageUrl?: string;
  maxParticipants?: number;
  isActive?: boolean;
}

// ============================================
// PROYECTOS
// ============================================
export type ProjectStatus = 
  | "PLANIFICACION" 
  | "EN_PROGRESO" 
  | "PAUSADO" 
  | "COMPLETADO" 
  | "CANCELADO";

export interface Project {
  id: number;
  title: string;
  description: string;
  category?: string;
  status: ProjectStatus;
  statusDisplayName: string;
  imageUrl?: string;
  budget?: number;
  fundsRaised: number;
  fundingPercentage: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  isFunded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  title: string;
  description: string;
  category?: string;
  status?: string;
  imageUrl?: string;
  budget?: number;
  fundsRaised?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

// ============================================
// NIÑOS EN ADOPCIÓN
// ============================================
export type AdoptionStatus = 
  | "DISPONIBLE" 
  | "EN_PROCESO" 
  | "APADRINADO" 
  | "NO_DISPONIBLE";

export interface AdoptionChild {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  age: number;
  gender?: string;
  photoUrl?: string;
  bio?: string;
  specialNeeds?: string;
  currentLocation?: string;
  adoptionStatus: AdoptionStatus;
  adoptionStatusDisplayName: string;
  sponsorId?: number;
  sponsorAssignedAt?: string;
  hasSponsor: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionChildRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender?: string;
  photoUrl?: string;
  bio?: string;
  specialNeeds?: string;
  currentLocation?: string;
  adoptionStatus?: string;
  sponsorId?: number;
  isActive?: boolean;
}

// ============================================
// API RESPONSES
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
  error?: string;
}

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================
export interface EventFilters {
  filter?: "active" | "upcoming" | "past";
  search?: string;
}

export interface ProjectFilters {
  filter?: "active";
  status?: ProjectStatus;
  category?: string;
  search?: string;
}

export interface ChildFilters {
  filter?: "active" | "available";
  status?: AdoptionStatus;
  search?: string;
}