// src/types/apadrinamiento.types.ts

export interface ICrearNinoRequest {
  // Define los campos según tu backend
  // Por ejemplo:
  // nombre: string;
  // edad: number;
  // etc.
}

export interface INinoResponse {
  // Define la respuesta del backend
}

export interface IActualizarNinoRequest {
  // Define los campos para actualizar
}

export interface ICambiarEstadoRequest {
  // Define los campos para cambiar estado
}

export enum EstadoNino {
  DISPONIBLE = "DISPONIBLE",
  EN_PROCESO = "EN_PROCESO",
  APADRINADO = "APADRINADO",
  NO_DISPONIBLE = "NO_DISPONIBLE"
}