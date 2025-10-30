DOCS - Fundación Huahuacuna Frontend
=========================================

Este documento consolida la documentación del frontend en lenguaje accesible, pensado para la sustentación y práctica de programación.

1) Resumen rápido
-------------------
- Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- Objetivo: interfaz para que los usuarios se registren, inicien sesión y accedan a un dashboard con información y CTAs.

2) Archivos y su propósito (explicación sencilla)
----------------------------------------------------
- `src/hooks/useAuth.ts`:
  - Qué hace: maneja login, register, logout, estado del usuario y persistencia en sessionStorage.
  - Por qué: centraliza lógica de autenticación y evita duplicación.

- `src/lib/api.ts`:
  - Qué hace: define `API_BASE_URL`, endpoints y `fetchWithTimeout`.
  - Por qué: un solo lugar para cambiar la URL del servidor o comportamiento de fetch.

- `src/components/auth/LoginForm.tsx` y `RegisterForm.tsx`:
  - Qué hacen: renderizan formularios, validan datos básicos y llaman a `useAuth`.
  - Por qué: separación UI vs lógica.

- `src/components/ui/Navbar.tsx`:
  - Qué hace: muestra enlaces, logo, nombre del usuario y logout.
  - Por qué: componente global de navegación reutilizable.

- `src/types/auth.ts`:
  - Qué hace: tipos TypeScript que describen requests y responses de auth.
  - Por qué: documentar el contrato de datos y prevenir errores.

- `src/app/*` (páginas): `login`, `registro`, `dashboard`:
  - Qué hacen: vistas que componen los componentes y presentan la UI por ruta.

3) Flujo de autenticación (explicación clara)
-----------------------------------------------
1. Usuario completa formulario en `LoginForm`.
2. `LoginForm` valida y llama `useAuth.login(email, password)`.
3. `useAuth` realiza POST a `API_ENDPOINTS.AUTH.LOGIN` usando `fetchWithTimeout`.
4. Si es exitoso, `useAuth` guarda `token` y `user` en `sessionStorage` y en estado local.
5. `LoginForm` redirige a `/dashboard`.

4) Consideraciones de usabilidad y accesibilidad (sencillo)
---------------------------------------------------------
- Lo que ya cumple:
  - Labels asociados a inputs, foco visible y mensajes de error.
- Recomendaciones fáciles:
  - Añadir `aria-live` y `role="alert"` en mensajes de error.
  - Revisar tabbabilidad y orden de foco.

5) Buenas prácticas y consejos para la práctica
--------------------------------------------------
- Mantener responsabilidades separadas: UI en componentes, lógica en hooks/servicios.
- Escribir tests unitarios para `useAuth` y cobertura E2E para login.
- Documentar endpoints y formatos de respuesta.
- Considerar cookies httpOnly para tokens en producción.

6) Frases cortas para decir en la sustentación
-----------------------------------------------
- "useAuth centraliza la autenticación y evita repetir lógica en formularios."  
- "Todas las llamadas pasan por `src/lib/api.ts`, por eso es fácil apuntar a otro backend."  
- "Las páginas en `src/app` componen UI a partir de componentes pequeños y reutilizables."  

--

Si quieres, puedo convertir este documento en un PDF o generar diapositivas con este contenido.

