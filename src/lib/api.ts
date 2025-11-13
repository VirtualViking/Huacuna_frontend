// src/lib/api.ts

export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
    VERIFY_TOKEN: (token: string) => `${API_BASE_URL}/api/auth/verify-token/${token}`,
  },
  CMS: {
    // EVENTOS
    EVENTS: `${API_BASE_URL}/api/cms/events`,
    EVENT_BY_ID: (id: number) => `${API_BASE_URL}/api/cms/events/${id}`,
    EVENT_ACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/events/${id}/activate`,
    EVENT_DEACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/events/${id}/deactivate`,
    EVENT_SEARCH: `${API_BASE_URL}/api/cms/events/search`,
    
    // PROYECTOS
    PROJECTS: `${API_BASE_URL}/api/cms/projects`,
    PROJECT_BY_ID: (id: number) => `${API_BASE_URL}/api/cms/projects/${id}`,
    PROJECT_ACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/projects/${id}/activate`,
    PROJECT_DEACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/projects/${id}/deactivate`,
    PROJECT_UPDATE_FUNDS: (id: number) => `${API_BASE_URL}/api/cms/projects/${id}/funds`,
    PROJECT_UPDATE_STATUS: (id: number) => `${API_BASE_URL}/api/cms/projects/${id}/status`,
    PROJECT_SEARCH: `${API_BASE_URL}/api/cms/projects/search`,
    
    // NIÑOS EN ADOPCIÓN
    CHILDREN: `${API_BASE_URL}/api/cms/children`,
    CHILD_BY_ID: (id: number) => `${API_BASE_URL}/api/cms/children/${id}`,
    CHILD_ACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/children/${id}/activate`,
    CHILD_DEACTIVATE: (id: number) => `${API_BASE_URL}/api/cms/children/${id}/deactivate`,
    CHILD_ASSIGN_SPONSOR: (id: number) => `${API_BASE_URL}/api/cms/children/${id}/sponsor`,
    CHILD_REMOVE_SPONSOR: (id: number) => `${API_BASE_URL}/api/cms/children/${id}/sponsor`,
    CHILD_UPDATE_STATUS: (id: number) => `${API_BASE_URL}/api/cms/children/${id}/status`,
    CHILD_SEARCH: `${API_BASE_URL}/api/cms/children/search`,
  }
};

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const REQUEST_TIMEOUT = 10000;

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado tiempo');
    }
    throw error;
  }
}

// ✅ CAMBIO 1: Usar sessionStorage en lugar de localStorage
// ✅ CAMBIO 2: Usar 'auth_token' en lugar de 'authToken'
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('auth_token');
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('auth_token', token);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('auth_token');
}

// ✅ CAMBIO 3: Mantener Authorization sin "Bearer " 
// (tu backend no lo necesita según el SecurityConfig)
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const token = getAuthToken();
  
  return fetchWithTimeout(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: token } : {}),
    },
  }, timeout);
}