
import axios from "axios";
import { 
  ICrearNinoRequest, 
  INinoResponse, 
  IActualizarNinoRequest,
  ICambiarEstadoRequest,
  EstadoNino
} from "../types/apadrinamiento.types"; // Ajustar la ruta de ser necesario necesario

// URL base de API de Spring Boot
const API_BASE_URL = "http://localhost:8080/api";

// Creamos una instancia de axios
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// El Interceptor de Petición
// Esto se ejecuta ANTES de que CADA petición sea enviada.
// Su trabajo es tomar el token del localStorage y añadirlo al header.
apiService.interceptors.request.use(
  (config) => {
    // Verificar que estamos en el navegador
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem("auth_token");
      
      if (token) {
        // Si el token existe, lo añadimos al header 'Authorization'
        config.headers["Authorization"] = token;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Definimos todos los endpoints ---

// == SERVICIO DE AUTENTICACIÓN (Auth) ==
// (Estos son públicos, no necesitan token)

export const authService = {
  login: (email: string, password: string) =>
    apiService.post("/auth/login", { email, password }),
  
  register: (nombre: string, email: string, password: string) =>
    apiService.post("/auth/register", { nombre, email, password }),
  
  // (Usa esto solo una vez para crear tu admin)
  registerAdmin: (nombre: string, email: string, password: string) =>
    apiService.post("/auth/register-admin", { nombre, email, password }),
};

// == SERVICIO DE APADRINAMIENTO (Ninos) ==
// (Estos son protegidos y usarán el interceptor)

export const ninoService = {
  /**
   * Obtiene todos los niños (para Admin o Usuario)
   * GET /api/v1/ninos
   */
  obtenerTodos: (estado?: EstadoNino) =>
    apiService.get<INinoResponse[]>("/v1/ninos", {
      params: { estado }, // Envía el estado como query param si existe
    }),

  /**
   * Obtiene un niño por ID (para Admin o Usuario)
   * GET /api/v1/ninos/{id}
   */
  obtenerPorId: (id: number) =>
    apiService.get<INinoResponse>(`/v1/ninos/${id}`),

  /**
   * Crea un nuevo niño (Solo Admin)
   * POST /api/v1/ninos
   */
  crear: (data: ICrearNinoRequest) =>
    apiService.post<INinoResponse>("/v1/ninos", data),

  /**
   * Actualiza un niño (Solo Admin)
   * PUT /api/v1/ninos/{id}
   */
  actualizar: (id: number, data: IActualizarNinoRequest) =>
    apiService.put<INinoResponse>(`/v1/ninos/${id}`, data),

  /**
   * Cambia el estado de un niño (Solo Admin)
   * PATCH /api/v1/ninos/{id}/estado
   */
  cambiarEstado: (id: number, data: ICambiarEstadoRequest) =>
    apiService.patch<INinoResponse>(`/v1/ninos/${id}/estado`, data),

  /**
   * Elimina un niño (Solo Admin)
   * DELETE /api/v1/ninos/{id}
   */
  eliminar: (id: number) =>
    apiService.delete<void>(`/v1/ninos/${id}`),
};

// Exportamos la instancia principal si se necesita
export default apiService;