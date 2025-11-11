
import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/poppins/400.css"; // <-- TU CÓDIGO (se queda)
import "@fontsource/poppins/500.css"; // <-- TU CÓDIGO (se queda)
import "@fontsource/poppins/600.css"; // <-- TU CÓDIGO (se queda)
import "@fontsource/poppins/700.css"; // <-- TU CÓDIGO (se queda)

// 1. AÑADIR ESTA LÍNEA
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Fundación Huahuacuna", // <-- TU CÓDIGO (se queda)
  description: "Conectando corazones, transformando vidas", // <-- TU CÓDIGO (se queda)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* 2. MANTENER TU CLASSNAME */}
      <body className="font-['Poppins'] antialiased">
        {/* 3. ENVOLVER {children} CON EL PROVIDER */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}