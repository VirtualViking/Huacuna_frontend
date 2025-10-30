// src/types/auth.ts

/*
  src/types/auth.ts

  Contiene las interfaces TypeScript usadas para describir los datos
  que intercambia el frontend con el backend en los flujos de autenticación.

  Por qué es útil:
  - Sirve como documentación dentro del código sobre la forma de los objetos.
  - Ayuda al compilador a detectar errores tempranos cuando los campos cambian.

  Mantener alineado con el backend: cuando el backend cambie las respuestas,
  actualizar estos tipos para mantener el contrato sincronizado.
*/

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

export interface IUserInfo {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: IUserInfo;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  user: IUserInfo;
}

export interface IErrorResponse {
  status: number;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}
